"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BookOpen, Search, ArrowRight, Mail, Calendar, Clock, User, Filter } from "lucide-react";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  // Unique categories
  const categories = ["Semua", ...Array.from(new Set(blogPosts.map((post) => post.category)))];

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured || selectedCategory !== "Semua");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriberEmail) {
      setEmailSubscribed(true);
      setSubscriberEmail("");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      {/* ================== Hero Section ================== */}
      <section className="relative overflow-hidden bg-secondary pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary to-primary/20 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,170,0.15),transparent_50%)]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog & Wawasan Conviq</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl mb-6">
            Wawasan Terbaru Seputar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Customer Support</span> & Teknologi AI
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Dapatkan berita, panduan mendalam, dan strategi bisnis untuk mengoptimalkan layanan pelanggan Anda serta mempercepat pertumbuhan bisnis di Indonesia.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto lg:mx-0 relative">
            <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1.5 focus-within:border-primary transition-all duration-300">
              <Search className="w-5 h-5 text-slate-400 ml-4" />
              <input
                type="text"
                placeholder="Cari artikel (misal: WhatsApp, AI)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-0 text-white placeholder-slate-400 focus:ring-0 py-2.5 px-3 outline-none"
                id="blog-search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================== Main Blog Content ================== */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        
        {/* Category Filters */}
        <AnimatedSection className="mb-12">
          <div className="flex flex-wrap items-center gap-3 bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-sm font-semibold text-slate-500 mr-2 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-primary" /> Kategori:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
                id={`filter-btn-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Featured Post (only shown when not searching/filtering or when "Semua" is active) */}
        {featuredPost && searchTerm === "" && selectedCategory === "Semua" && (
          <AnimatedSection className="mb-16">
            <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 group grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative min-h-[300px] lg:min-h-[450px] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-6 left-6 bg-gradient-to-r from-primary to-accent text-slate-950 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {featuredPost.tag}
                </div>
              </div>
              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-accent" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-secondary tracking-tight mb-4 group-hover:text-primary transition-colors duration-200">
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-secondary">{featuredPost.author.name}</h4>
                      <p className="text-xs text-slate-500">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  {/* CTA */}
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-200 text-sm group-hover:text-primary-dark"
                    id="featured-read-more"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Regular Posts Grid */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-secondary tracking-tight mb-8">
            {searchTerm || selectedCategory !== "Semua"
              ? `Hasil Pencarian (${filteredPosts.length})`
              : "Artikel Terbaru"}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-secondary mb-2">Artikel Tidak Ditemukan</h3>
              <p className="text-slate-500 text-sm mb-6">
                Tidak ada artikel yang cocok dengan kata kunci atau kategori yang Anda pilih.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Semua");
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 transition-all"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <AnimatedSection key={post.slug} delay={index * 0.1}>
                  <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-secondary/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>
                    {/* Body */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-primary" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-accent" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-extrabold text-secondary tracking-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                        {/* Author */}
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                          />
                          <span className="text-xs font-bold text-secondary">{post.author.name}</span>
                        </div>
                        {/* Read link */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:gap-2 transition-all duration-200"
                          id={`post-link-${post.slug}`}
                        >
                          <span>Baca</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </section>

        {/* ================== Newsletter Subscription ================== */}
        <AnimatedSection>
          <div className="bg-gradient-to-r from-secondary to-secondary-light text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,170,0.15),transparent_50%)] animate-pulse" />
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
                Berlangganan Newsletter Mingguan Kami
              </h2>
              <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
                Dapatkan tips gratis, studi kasus customer support e-commerce, dan tutorial AI terkini langsung di inbox email Anda setiap hari Senin.
              </p>

              {emailSubscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-6 py-4 rounded-2xl max-w-md mx-auto animate-fadeIn">
                  🎉 Terima kasih! Pendaftaran email Anda berhasil dilakukan.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Masukkan alamat email Anda"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-sm placeholder-slate-400 focus:outline-none focus:border-primary text-white"
                    id="newsletter-email"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2"
                    id="newsletter-submit-btn"
                  >
                    <span>Daftar Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
