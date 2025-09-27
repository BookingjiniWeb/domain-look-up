'use client'
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Utility
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

// MultiSelect Component
function MultiSelect({ options, selected, onChange, placeholder = "Select options" }) {
  const [open, setOpen] = useState(false)

  const toggleOption = (option) => {
    const isSelected = selected.some((item) => item.value === option.value)
    if (isSelected) {
      onChange(selected.filter((item) => item.value !== option.value))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full flex justify-between items-center px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
        >
          <span className="truncate">
            {selected.length > 0
              ? selected.map((s) => s.label).join(", ")
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 shadow-lg rounded-md border border-gray-200 z-[100000]">
        <Command>
          <CommandInput placeholder="Search..." className="border-b border-gray-200" />
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.some((item) => item.value === option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-blue-50"
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center h-4 w-4 border rounded-sm",
                        isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Career Page
export default function CareerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    exp: "",
    ctc: "",
    expected: "",
    position: "",
    doj: "",
    skills: [],
  })

  const [loading, setLoading] = useState(false)

  const skillOptions = [
    { label: "HTML5", value: "html5" },
    { label: "CSS3", value: "css3" },
    { label: "JavaScript", value: "javascript" },
    { label: "TailwindCSS", value: "tailwind" },
    { label: "Bootstrap", value: "bootstrap" },
    { label: "WordPress", value: "wordpress" },
    { label: "Wix", value: "wix" },
    { label: "Shopify", value: "shopify" },
    { label: "Domain Management", value: "domain_management" },
    { label: "Web Hosting", value: "web_hosting" },
    { label: "Responsive Design", value: "responsive_design" },
    { label: "SEO Basics", value: "seo_basics" },
    { label: "Git", value: "git" },
    { label: "UI/UX Principles", value: "ui_ux" },
    { label: "jQuery", value: "jquery" },
    { label: "PHP", value: "php" },
    { label: "MySQL", value: "mysql" },
    { label: "JSON", value: "json" },
    { label: "Cross-Browser Compatibility", value: "cross_browser" },
    { label: "Debugging", value: "debugging" },
    { label: "Command Line Basics", value: "command_line" },
    { label: "Basic Security Practices", value: "security" },
    { label: "Performance Optimization", value: "performance_optimization" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/dev-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success("Form submitted successfully!")
        setForm({
          name: "",
          email: "",
          phone: "",
          linkedin: "",
          exp: "",
          ctc: "",
          expected: "",
          position: "",
          doj: "",
          skills: [],
        })
      } else {
        toast.error("An error occurred while submitting the form.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An error occurred while submitting the form.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-blue-900 flex justify-center items-center z-[99999]">
      <Card className="w-full max-w-3xl max-h-screen shadow-lg rounded-lg border border-gray-300">
        <CardContent className="p-8 overflow-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 text-center">
            🚀 Web Developer Position
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col w-full">
              <Label>Name</Label>
              <Input
                className="mt-1 w-full"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col w-full">
              <Label>Email</Label>
              <Input
                className="mt-1 w-full"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col w-full">
              <Label>Phone</Label>
              <Input
                className="mt-1 w-full"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col w-full">
              <Label>LinkedIn / Portfolio URL</Label>
              <Input
                className="mt-1 w-full"
                type="url"
                placeholder="https://"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col w-full">
              <Label>Years of Experience</Label>
              <Select value={form.exp} onValueChange={(val) => setForm({ ...form, exp: val })}>
                <SelectTrigger className="mt-1 min-h-[44px] w-full flex justify-between items-center px-3">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="no">No Experience</SelectItem>
                  <SelectItem value="0-1">0 - 1 Years</SelectItem>
                  <SelectItem value="1-2">1 - 2 Years</SelectItem>
                  <SelectItem value="2-5">2 - 5 Years</SelectItem>
                  <SelectItem value="5+">5+ Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* DOJ */}
            <div className="flex flex-col w-full">
              <Label>Date of Joining</Label>
              <Select value={form.doj} onValueChange={(val) => setForm({ ...form, doj: val })}>
                <SelectTrigger className="mt-1 min-h-[44px] w-full flex justify-between items-center px-3">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="within15">Within 15 days</SelectItem>
                  <SelectItem value="within30">Within 30 days</SelectItem>
                  <SelectItem value="morethan30">More than 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CTC */}
            {form.exp !== "no" && (
              <>
                <div className="flex flex-col w-full">
                  <Label>Current CTC</Label>
                  <Input
                    className="mt-1 w-full"
                    placeholder="e.g. 8 LPA"
                    value={form.ctc}
                    onChange={(e) => setForm({ ...form, ctc: e.target.value })}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <Label>Expected CTC</Label>
                  <Input
                    className="mt-1 w-full"
                    placeholder="e.g. 12 LPA"
                    value={form.expected}
                    onChange={(e) => setForm({ ...form, expected: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Skills */}
            <div className="md:col-span-2 flex flex-col w-full">
              <Label className="mb-2">Skills</Label>
              <MultiSelect
                options={skillOptions}
                selected={form.skills}
                onChange={(val) => setForm({ ...form, skills: val })}
                placeholder="Select relevant skills"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 w-full">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-lg font-semibold rounded-md ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Toast Container inside this component */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}
