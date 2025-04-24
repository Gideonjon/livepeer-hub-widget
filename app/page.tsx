import { ContributorsWidget } from "@/app/components/ContributorsWidget"
import { WidgetDemo } from "@/app/components/WidgetDemo"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0F0F0F] text-white p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
          <span className="text-[#07FBB2]">Contributors Spotlight</span> Widget
        </h1>
        <p className="text-gray-400 mb-8">
          Showcase your open-source contributors with this customizable widget for the Livepeer Dev Hub.
        </p>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="border border-[#282828] rounded-xl p-4 bg-[#131716]">
            <ContributorsWidget randomize={true} maxDisplay={1} autoRotate={true} rotationInterval={5000} />
          </div>
        </div>

        <WidgetDemo />
      </div>
    </main>
  )
}
