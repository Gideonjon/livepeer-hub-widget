"use client"

import { useState } from "react"
import { ContributorsWidget } from "./ContributorsWidget"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { CopyIcon } from "lucide-react"

export function WidgetDemo() {
  const [maxDisplay, setMaxDisplay] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotationInterval, setRotationInterval] = useState(5) // Now in seconds
  const [randomize, setRandomize] = useState(true)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [copied, setCopied] = useState(false)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Convert seconds to milliseconds for the widget
  const rotationIntervalMs = rotationInterval * 1000

  const iframeCode = `<iframe
  src="https://livepeer-hub-widget.vercel.app/widget?maxDisplay=${maxDisplay}&autoRotate=${autoRotate}&rotationInterval=${rotationIntervalMs}&randomize=${randomize}&theme=${theme}"
  style="border: none; width: 100%; height: 400px; max-width: 600px; border-radius: 12px; overflow: hidden;"
  title="Livepeer Contributors Spotlight"
></iframe>`

  const scriptCode = `<script
  src="https://livepeer-hub-widget.vercel.app/embed.js?maxDisplay=${maxDisplay}&autoRotate=${autoRotate}&rotationInterval=${rotationIntervalMs}&randomize=${randomize}&theme=${theme}"
  async
></script>`

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4">Customize Your Widget</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="maxDisplay">Number of Contributors</Label>
            <Input
              id="maxDisplay"
              type="number"
              min="1"
              max="10"
              value={maxDisplay}
              onChange={(e) => setMaxDisplay(Number.parseInt(e.target.value) || 1)}
              className="bg-[#131716] border-[#282828]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rotationInterval">Rotation Interval (seconds)</Label>
            <Input
              id="rotationInterval"
              type="number"
              min="1"
              step="1"
              value={rotationInterval}
              onChange={(e) => setRotationInterval(Number.parseInt(e.target.value) || 5)}
              className="bg-[#131716] border-[#282828]"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 p-4 rounded-md bg-[#131716] border border-[#282828]">
            <Label htmlFor="autoRotate" className="cursor-pointer">
              Auto Rotate Contributors
            </Label>
            <Switch
              id="autoRotate"
              checked={autoRotate}
              onCheckedChange={setAutoRotate}
              className="data-[state=checked]:bg-[#07fbb2]"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 p-4 rounded-md bg-[#131716] border border-[#282828]">
            <Label htmlFor="randomize" className="cursor-pointer">
              Randomize Selection
            </Label>
            <Switch
              id="randomize"
              checked={randomize}
              onCheckedChange={setRandomize}
              className="data-[state=checked]:bg-[#07fbb2]"
            />
          </div>

          <div className="grid gap-2">
            <Label>Theme</Label>
            <div className="flex space-x-2">
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className={theme === "dark" ? "bg-[#07FBB2] text-black hover:bg-[#07FBB2]/90" : ""}
              >
                Dark
              </Button>
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className={theme === "light" ? "bg-[#07FBB2] text-black hover:bg-[#07FBB2]/90" : ""}
              >
                Light
              </Button>
            </div>
          </div>
        </div>

        <div className="border border-[#282828] rounded-xl p-4 bg-[#131716]">
          <ContributorsWidget
            maxDisplay={maxDisplay}
            autoRotate={autoRotate}
            rotationInterval={rotationIntervalMs}
            randomize={randomize}
            theme={theme}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Embed the Widget</h2>

        <Tabs defaultValue="iframe" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#131716]">
            <TabsTrigger value="iframe">Iframe</TabsTrigger>
            <TabsTrigger value="script">Script</TabsTrigger>
          </TabsList>
          <TabsContent value="iframe" className="mt-4">
            <div className="relative">
              <pre className="bg-[#131716] p-4 rounded-lg overflow-x-auto text-sm">
                <code>{iframeCode}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(iframeCode)}
              >
                {copied ? "Copied!" : <CopyIcon className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="script" className="mt-4">
            <div className="relative">
              <pre className="bg-[#131716] p-4 rounded-lg overflow-x-auto text-sm">
                <code>{scriptCode}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(scriptCode)}
              >
                {copied ? "Copied!" : <CopyIcon className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
