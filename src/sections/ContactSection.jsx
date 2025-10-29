function ContactSection() {
  const contacts = [
    { icon: <Mail className="w-8 h-8" />, label: 'Email', value: 'support@networksupport.com' },
    { icon: <Phone className="w-8 h-8" />, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: <MapPin className="w-8 h-8" />, label: 'Address', value: '123 Tech Street, New York, NY' },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Get In Touch</h2>
        <p className="text-center text-gray-400 mb-16">
          Have questions? We'd love to hear from you. Contact us anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contacts.map((contact, idx) => (
            <ContactCard key={idx} {...contact} />
          ))}
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-2xl mx-auto hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition">
          <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/30 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/30 transition"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/30 transition resize-none"
            />
            <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition active:scale-95">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}