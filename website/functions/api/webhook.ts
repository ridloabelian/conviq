interface Env {
  MAYAR_WEBHOOK_TOKEN?: string;
  RAILS_BACKEND_URL?: string; // e.g., 'https://app.conviq.com' or 'http://localhost:3000' for local dev
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    // Read the incoming JSON body from Mayar.id
    const body: any = await context.request.json();
    console.log("Received Webhook from Mayar.id:", JSON.stringify(body));

    // Determine event type
    const eventType = body.eventType;
    const isPaid = eventType === "transaction.paid" || body.data?.status === true || body.data?.status === "paid";

    if (!isPaid) {
      return new Response(
        JSON.stringify({ message: "Webhook diterima tetapi status bukan berbayar/lunas, diabaikan." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Extract extraData (contains accountId and plan)
    const extraData = body.data?.extraData || body.extraData;
    if (!extraData || !extraData.accountId || !extraData.plan) {
      console.warn("Webhook warning: extraData tidak lengkap atau kosong.", extraData);
      return new Response(
        JSON.stringify({ message: "Data kustom (accountId atau plan) tidak ditemukan, diabaikan." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const { accountId, plan, isSelfHosted } = extraData;

    // Retrieve security token & Rails backend URL from env
    const webhookToken = context.env.MAYAR_WEBHOOK_TOKEN;
    const railsBackendUrl = context.env.RAILS_BACKEND_URL || "http://localhost:3000";

    if (!webhookToken) {
      console.error("Webhook error: MAYAR_WEBHOOK_TOKEN tidak dikonfigurasi pada Cloudflare env.");
      return new Response(
        JSON.stringify({ message: "Internal Server Error: Token webhook tidak dikonfigurasi." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send securely to the Ruby on Rails backend provisioning endpoint
    const railsEndpoint = `${railsBackendUrl}/enterprise/webhooks/mayar`;
    console.log(`Forwarding provisioning to Rails: ${railsEndpoint} for account: ${accountId}`);

    const railsResponse = await fetch(railsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Conviq-Webhook-Token": webhookToken
      },
      body: JSON.stringify({
        accountId: accountId,
        plan: plan,
        isSelfHosted: isSelfHosted === "true" || isSelfHosted === true,
        invoiceId: body.data?.invoiceId || body.data?.id || "N/A",
        email: body.data?.email || body.email || "N/A"
      })
    });

    const railsData: any = await railsResponse.json().catch(() => ({}));

    if (!railsResponse.ok) {
      console.error(`Rails integration error (Status ${railsResponse.status}):`, JSON.stringify(railsData));
      // Even if Rails fails, we want to return 200 to Mayar so it doesn't keep retrying,
      // but we log it as an error for debugging.
      return new Response(
        JSON.stringify({
          message: "Webhook diterima dari Mayar, namun gagal memproses di server internal Conviq.",
          error: railsData.message || "Gagal menghubungi Rails."
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Rails provisioning completed successfully:", JSON.stringify(railsData));

    return new Response(
      JSON.stringify({
        message: "Webhook Mayar berhasil diproses dan diteruskan ke Rails.",
        success: true
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Webhook internal error:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan internal pada webhook receiver.", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
