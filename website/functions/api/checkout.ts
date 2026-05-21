interface Env {
  MAYAR_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body: any = await context.request.json();
    const { name, email, mobile, accountId, plan, isSelfHosted } = body;

    // Validate inputs
    if (!name || !email || !mobile || !accountId || !plan) {
      return new Response(
        JSON.stringify({ message: "Semua data wajib diisi (Nama, Email, WhatsApp, ID Akun)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Determine price based on selected plan
    let rate = 0;
    const cleanPlan = plan.toLowerCase();

    if (cleanPlan === "growth") {
      rate = 299000;
    } else if (cleanPlan === "business") {
      rate = 599000;
    } else if (cleanPlan === "premium") {
      rate = 299000;
    } else {
      return new Response(
        JSON.stringify({ message: "Plan tidak valid." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Retrieve Mayar API Key from env
    const apiKey = context.env.MAYAR_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ message: "Sistem Billing sedang dalam pemeliharaan (MAYAR_API_KEY tidak dikonfigurasi)." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Determine sandbox vs production base URL
    // Sandbox API keys usually start with 'sk_sandbox' or 'sk_test'
    const isSandbox = apiKey.includes("sandbox") || apiKey.includes("test");
    const baseUrl = isSandbox ? "https://api.mayar.club" : "https://api.mayar.id";

    // Prepare redirect URL
    const origin = new URL(context.request.url).origin;
    const redirectUrl = `${origin}/pricing/success?plan=${cleanPlan}&email=${encodeURIComponent(email)}`;

    // Prepare Mayar create invoice payload
    const payload = {
      name,
      email,
      mobile,
      redirectUrl,
      description: `Upgrade Paket Conviq: ${plan.toUpperCase()} (${isSelfHosted ? "Self-Hosted" : "Cloud"}) - ID Akun: ${accountId}`,
      items: [
        {
          quantity: 1,
          rate: rate,
          description: `Paket Conviq ${plan.toUpperCase()} (${isSelfHosted ? "Self-Hosted" : "Cloud"}) - 1 Bulan`
        }
      ],
      extraData: {
        accountId,
        plan: cleanPlan,
        isSelfHosted: String(isSelfHosted)
      }
    };

    // Call Mayar API
    const response = await fetch(`${baseUrl}/hl/v1/invoice/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data: any = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          message: data.message || "Gagal membuat invoice di Mayar.id.",
          details: data
        }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the payment checkout link to the client
    return new Response(
      JSON.stringify({
        checkoutUrl: data.data?.link || data.data?.url || data.link || data.url || data.paymentUrl,
        invoiceId: data.data?.id || data.id
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan internal pada server.", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
