"use client";

export default function DryFruitsBenefits() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-green-700">Dry Fruits & Their Benefits</h1>
      <p className="text-center text-gray-600 mt-2">
        Boost your health with nature’s powerhouse of nutrition! 🌿
      </p>

      {/* Dry Fruits List */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Almonds */}
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">🥜 Almonds</h2>
          <p className="text-gray-700 mt-2">
            - Rich in Vitamin E & healthy fats  
            - Boosts brain function & heart health  
            - Aids in weight management & skin glow  
          </p>
        </div>

        {/* Walnuts */}
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">🌰 Walnuts</h2>
          <p className="text-gray-700 mt-2">
            - High in Omega-3 for heart & brain health  
            - Helps reduce inflammation & stress  
            - Good for memory & cognitive function  
          </p>
        </div>

        {/* Cashews */}
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">🥜 Cashews</h2>
          <p className="text-gray-700 mt-2">
            - Good for heart health & cholesterol control  
            - Rich in copper & magnesium for strong bones  
            - Enhances immune function & energy levels  
          </p>
        </div>

        {/* Raisins */}
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">🍇 Raisins</h2>
          <p className="text-gray-700 mt-2">
            - Improves digestion & prevents constipation  
            - High in iron, great for anemia  
            - Natural energy booster  
          </p>
        </div>

        {/* Dates */}
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">🌴 Dates</h2>
          <p className="text-gray-700 mt-2">
            - Natural sweetener with high fiber content  
            - Supports digestion & bone strength  
            - Rich in potassium for heart health  
          </p>
        </div>

        {/* Pistachios */}
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">🌰 Pistachios</h2>
          <p className="text-gray-700 mt-2">
            - Loaded with antioxidants & protein  
            - Aids in weight loss & controls blood sugar  
            - Promotes good eye health  
          </p>
        </div>
      </section>

      {/* How to Consume */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">🥗 Best Ways to Consume Dry Fruits</h2>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>Soak almonds overnight for better digestion</li>
          <li>Eat a handful of mixed nuts daily for balanced nutrition</li>
          <li>Use dry fruits in smoothies, desserts, and salads</li>
          <li>Prefer unsalted and raw nuts for maximum benefits</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">❓ Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">How many dry fruits should I eat daily?</summary>
            <p className="mt-2 text-gray-700">
              A balanced quantity is **5-10 almonds, 2-3 walnuts, 4-5 cashews, and 8-10 raisins per day**.
            </p>
          </details>

          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Are dry fruits good for weight loss?</summary>
            <p className="mt-2 text-gray-700">
              Yes! **Nuts like almonds & walnuts** help in weight management by keeping you full for longer.
            </p>
          </details>

          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Which dry fruit is best for brain health?</summary>
            <p className="mt-2 text-gray-700">
              **Walnuts** are the best for brain health as they are rich in Omega-3 fatty acids.
            </p>
          </details>

          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Can diabetics eat dry fruits?</summary>
            <p className="mt-2 text-gray-700">
              Yes, but **choose unsweetened, natural nuts** like almonds, walnuts, and pistachios.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
