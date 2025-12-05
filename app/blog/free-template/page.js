export const metadata = {
  title: 'The ₹10 Lakh Mistake | Dangers of Free Legal Templates',
  description: 'Why copy-pasting contracts from the internet puts your Indian startup at risk. Learn about Jurisdiction errors, Missing Vesting, and IP theft.',
}

export default function FreeTemplateTrap() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 font-sans text-gray-800">
      {/* Header Section */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          The ₹10 Lakh Mistake: Why "Free" Contract Templates Destroy Indian Startups
        </h1>
        <p className="text-gray-500 italic">
          By The Compliers | 5 Minute Read
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          It is the classic startup story. You have a great idea, a co-founder, and a lot of passion. You need a Co-Founders Agreement or a Vendor Contract. But you don't have the budget for a big law firm.
        </p>
        <p>
          So, you do what everyone does: <strong>You Google it.</strong> Or you ask ChatGPT to "Write a contract for me."
        </p>
        <p>
          You download a template, change the names, sign it, and file it away. You think you saved ₹20,000. In reality, you just planted a time bomb that could cost you ₹10 Lakhs (or your entire company) two years from now.
        </p>
        <p>
          Here are the three ways "Free Templates" kill Indian startups.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-8">1. The "State of Delaware" Trap</h2>
        <p>
          Most free templates on the internet are written for US startups. They reference the "State of Delaware" or "California Law" for dispute resolution.
        </p>
        <p>
          <strong>The Risk:</strong> If your co-founder steals your data in Delhi, you cannot sue them in Saket District Court because your contract says you must sue them in the USA. Your contract is technically valid, but practically useless.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-8">2. The Missing "Reverse Vesting" Clause</h2>
        <p>
          You and your co-founder split equity 50-50. Six months later, they lose interest and quit. In a standard template, they walk away with 50% of your company.
        </p>
        <p>
          <strong>The Fix:</strong> A lawyer ensures you have a "Reverse Vesting" clause. This means if they leave early, they have to sell their shares back to the company for ₹1. Free templates rarely include this nuanced mechanism tailored for Indian ROC compliance.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-8">3. Who Owns the IP?</h2>
        <p>
          You hired a freelancer to build your app. You used a generic "Service Agreement."
        </p>
        <p>
          <strong>The Law:</strong> Under the Indian Copyright Act, if the contract doesn't explicitly state "Work for Hire" and assign IP to the company, the <em>freelancer</em> owns the code, not you. When you try to raise investment, the VC will fail your due diligence because you don't actually own your product.
        </p>

        <hr className="my-10 border-gray-300" />

        <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-3">Don't risk your hard work to save a few rupees.</h3>
          <p className="mb-4">
            At <strong>The Compliers</strong>, we don't just draft documents; we build shields. Our <strong>Startup Protection Package</strong> is designed specifically for Delhi/NCR founders to close these loopholes.
          </p>
          <a 
            href="mailto:contact@thecompliers.com?subject=I need the Startup Shield" 
            className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition"
          >
            Get Protected Now
          </a>
        </div>
      </div>
    </article>
  );
}
