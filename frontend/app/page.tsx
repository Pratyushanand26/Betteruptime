import { ArrowRight, CheckCircle, Clock, Shield, Activity, Bell, Globe, BarChart3, Zap, TrendingUp, Users, Check, Star, Github, Twitter, Linkedin, Menu, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import heroImage from "@/assets/hero-dark.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router=useRouter()

  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Monitor your websites and APIs every 30 seconds from multiple global locations with advanced threat detection.",
      color: "text-primary"
    },
    {
      icon: Bell,
      title: "Smart Alerts", 
      description: "AI-powered notifications via email, SMS, Slack, Discord, or webhooks with intelligent escalation policies.",
      color: "text-warning"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Monitor from 25+ worldwide locations including AWS, GCP, and Azure regions for true global coverage.",
      color: "text-success"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep performance insights with response time analysis, error tracking, and predictive downtime alerts.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Security Monitoring",
      description: "SSL certificate tracking, security headers validation, and vulnerability scanning for complete protection.",
      color: "text-success"
    },
    {
      icon: Zap,
      title: "Lightning Setup",
      description: "Get monitoring live in under 30 seconds with our no-code setup and automatic service discovery.",
      color: "text-warning"
    }
  ];

  const stats = [
    {
      icon: CheckCircle,
      value: "99.99%",
      label: "Average Uptime",
      description: "Across all monitored services"
    },
    {
      icon: Users,
      value: "50,000+",
      label: "Trusted Users", 
      description: "From startups to enterprises"
    },
    {
      icon: Clock,
      value: "10s",
      label: "Check Frequency",
      description: "Ultra-fast monitoring intervals"
    },
    {
      icon: TrendingUp,
      value: "24/7",
      label: "Always Watching",
      description: "Never miss a single incident"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for small websites and personal projects",
      features: [
        "Monitor up to 5 websites",
        "30-second checks",
        "Email notifications",
        "SSL monitoring",
        "Basic reports",
        "7-day data retention"
      ],
      popular: false
    },
    {
      name: "Professional", 
      price: "$29",
      period: "/month",
      description: "Great for growing businesses and development teams",
      features: [
        "Monitor up to 50 websites",
        "10-second checks",
        "All notification methods",
        "Advanced SSL monitoring",
        "Performance analytics",
        "API access",
        "Custom status pages",
        "90-day data retention"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month", 
      description: "For large organizations with mission-critical infrastructure",
      features: [
        "Unlimited websites",
        "5-second checks",
        "Priority alerting",
        "Advanced security scanning",
        "Custom integrations",
        "Dedicated support",
        "White-label solutions",
        "Unlimited data retention",
        "SLA guarantees"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-glass backdrop-blur-glass border-b border-glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                UptimeMonitor
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <Button onClick={()=>{
                    router.push("/signin")
                  }} variant="ghost" size="sm">Sign In</Button>
              <Button onClick={()=>{
                    router.push("/signup")
                  }}  size="sm">Start Free Trial</Button>
            </div>

            <button 
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
            <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <div className="flex flex-col gap-4 mt-8">
              <Button onClick={()=>{
                    router.push("/signin")
                  }} variant="ghost">Sign In</Button>
              <Button onClick={()=>{
                    router.push("/signup")
                  }}>Start Free Trial</Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-16 min-h-screen flex items-center bg-gradient-mesh">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-success bg-success/10 rounded-full px-4 py-2 w-fit border border-success/20">
                  <CheckCircle className="w-4 h-4" />
                  99.99% Uptime Guaranteed
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Monitor Your{" "}
                  <span className="bg-gradient-hero bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                    Infrastructure
                  </span>{" "}
                  Like Never Before
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Get lightning-fast alerts when your services go down. Advanced monitoring with AI-powered insights, global coverage, and enterprise-grade reliability.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={()=>{
                    router.push("/signup")
                  }} size="lg" className="group text-lg px-8 py-4 h-auto">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="group text-lg px-8 py-4 h-auto border-glass bg-glass backdrop-blur-glass">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">10-second checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium">Enterprise security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-warning" />
                  <span className="text-sm font-medium">25+ locations</span>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="relative rounded-3xl overflow-hidden shadow-glass animate-float">
                <Image 
                  src={heroImage} 
                  alt="Advanced uptime monitoring dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
              
              {/* Floating status cards */}
              <div className="absolute -top-6 -left-6 bg-glass backdrop-blur-glass rounded-2xl p-6 shadow-glass border border-glass animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-success rounded-full animate-pulse shadow-success" />
                  <div>
                    <div className="text-sm font-semibold">All Systems Operational</div>
                    <div className="text-xs text-muted-foreground">Last checked: 2s ago</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-glass backdrop-blur-glass rounded-2xl p-6 shadow-glass border border-glass">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-success bg-clip-text text-transparent">99.99%</div>
                  <div className="text-sm text-muted-foreground">Uptime This Month</div>
                  <div className="text-xs text-success mt-1">↗ +0.02% vs last month</div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-8 bg-glass backdrop-blur-glass rounded-2xl p-4 shadow-glass border border-glass animate-float" style={{animationDelay: '2s'}}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">47ms</div>
                  <div className="text-xs text-muted-foreground">Avg Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Next-Generation
              </span>{" "}
              Monitoring Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive monitoring tools powered by AI and designed for modern infrastructure. 
              From simple websites to complex microservices architectures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-glass backdrop-blur-glass border-glass shadow-glass hover:shadow-glow transition-all duration-500 hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-card group-hover:scale-110 transition-transform duration-300 shadow-elevation">
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full" style={{backgroundRepeat: 'repeat'}}>
            <g fill="none" fillRule="evenodd">
              <g fill="#9C92AC" fillOpacity="0.1">
                <circle cx="30" cy="30" r="4"/>
              </g>
            </g>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join thousands of companies that rely on our monitoring to keep their critical services online and their customers happy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white group">
                <div className="inline-flex p-6 rounded-3xl bg-white/10 backdrop-blur-md mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glass">
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-2xl font-semibold mb-2">{stat.label}</div>
                <div className="text-white/70 text-lg">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your monitoring needs. All plans include our 14-day free trial with no credit card required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-glow scale-105' : 'border-glass'} bg-glass backdrop-blur-glass transition-all duration-500 hover:scale-105 hover:shadow-glow`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-glow">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <h3 className="text-3xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 text-xl">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8 pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button onClick={()=>{
                    router.push("/signup")
                  }}
                    size="lg" 
                    className="w-full text-lg py-4 h-auto"
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground text-lg">
              All plans include 14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-mesh relative">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Ready to Never Miss{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Downtime Again?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands of businesses monitoring their infrastructure with our cutting-edge platform. 
              Get started in under 30 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={()=>{
                    router.push("/signup")
                  }} size="lg" className="text-lg px-12 py-4 h-auto">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-12 py-4 h-auto border-glass bg-glass backdrop-blur-glass">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card/50 backdrop-blur-md border-t border-glass">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Activity className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  UptimeMonitor
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Next-generation website monitoring for modern businesses. Keep your sites up and your users happy with our AI-powered platform.
              </p>
              <div className="flex gap-4">
                <Github className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status Page</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">Resources</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-glass mt-16 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 UptimeMonitor. All rights reserved. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;