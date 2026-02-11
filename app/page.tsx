import { SignInButton } from "@clerk/nextjs";
import * as motion from "motion/react-client";
import { ArrowRight, Car, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RoboCar - Your Car Maintenance Tracker",
  description:
    "Never miss a maintenance deadline again. RoboCar helps you track and manage your car maintenance schedules effortlessly.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <motion.div
        className="max-w-5xl w-full text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Logo/Icon */}
          <motion.div
            className="flex justify-center"
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-6 rounded-3xl shadow-2xl">
              <Car className="w-16 h-16 text-white" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-LuckiestGuy bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400">
            RoboCar
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-3xl lg:text-4xl text-slate-700 dark:text-slate-200 font-medium max-w-3xl mx-auto">
            Your Smart Car Maintenance Tracker
          </p>

          {/* Description */}
          <p className="text-base md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Never miss a maintenance deadline again. Track service schedules,
            get timely reminders, and keep your car running smoothly.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            {
              title: "Track Maintenance",
              description: "Keep detailed records of all your car services",
            },
            {
              title: "Get Reminders",
              description: "Never miss an oil change or inspection again",
            },
            {
              title: "Stay Organized",
              description: "Manage multiple vehicles in one place",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <CheckCircle2 className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="pt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
        >
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <motion.button
              className="group relative px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </SignInButton>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="text-sm md:text-base text-slate-500 dark:text-slate-400 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Free to use • No credit card required
        </motion.p>
      </motion.div>
    </main>
  );
}
