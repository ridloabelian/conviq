import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, MessageCircle, Sparkles, Send, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ShareButton } from "@/components/ShareButton";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Recommend other posts (excluding this one)
  const recommendedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 pt-24">
      {/* ================== Breadcrumbs & Navigation ================== */}
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-slate-600 line-clamp-1">{post.title}</span>
      </div>

      {/* ================== Header Section ================== */}
      <header className="max-w-4xl mx-auto px-6 mt-4 mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors mb-6"
          id="back-to-blog-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Blog</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{post.category}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-secondary leading-tight tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-100 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <h4 className="font-bold text-secondary text-sm">{post.author.name}</h4>
              <p className="text-[10px] text-slate-400">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Diterbitkan: {post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-accent" />
            <span>Estimasi: {post.readTime}</span>
          </div>
        </div>
      </header>

      {/* ================== Featured Image ================== */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-md border border-slate-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ================== Content Body ================== */}
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Article Content */}
        <article className="lg:col-span-2">
          <div 
            className="prose prose-slate max-w-none prose-headings:text-secondary prose-headings:font-black prose-a:text-primary hover:prose-a:text-primary-dark prose-strong:text-secondary prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Sidebar / Quick Widget CTAs */}
        <aside className="space-y-8">
          {/* Try Conviq Widget */}
          <div className="bg-gradient-to-br from-secondary to-slate-900 text-white rounded-3xl p-6 shadow-md border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,212,170,0.15),transparent_60%)]" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black tracking-tight mb-2">Ingin Mencoba Conviq?</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                Tingkatkan layanan support Anda seperti dibahas di artikel ini dengan platform bertenaga AI.
              </p>
              <Link
                href="/pricing"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md shadow-primary/15 flex items-center justify-center gap-1.5"
                id="sidebar-cta-pricing"
              >
                <span>Mulai Gratis Sekarang</span>
                <Send className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Share widget */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-slate-800">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Bagikan Artikel</h4>
            <div className="flex gap-2">
              <ShareButton />
            </div>
          </div>
        </aside>
      </div>

      {/* ================== Recommended Posts Section ================== */}
      <footer className="max-w-4xl mx-auto px-6 mt-16 pt-12 border-t border-slate-200">
        <h3 className="text-xl font-black text-secondary tracking-tight mb-6">Artikel Rekomendasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recommendedPosts.map((recPost) => (
            <div 
              key={recPost.slug}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wide block mb-2">{recPost.category}</span>
                <h4 className="text-base font-bold text-secondary line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${recPost.slug}`}>{recPost.title}</Link>
                </h4>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <span className="text-[10px] font-semibold text-slate-400">{recPost.date}</span>
                <Link 
                  href={`/blog/${recPost.slug}`}
                  className="text-xs font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1"
                  id={`rec-link-${recPost.slug}`}
                >
                  <span>Baca</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
