import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/store/auth";

export function LoginDialog() {
  const { loginOpen, setLoginOpen, signIn } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const close = (open: boolean) => {
    setLoginOpen(open);
    if (!open) {
      setStep("phone");
      setOtp("");
    }
  };

  return (
    <Dialog open={loginOpen} onOpenChange={close}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {step === "phone" ? "India's last minute app" : "Enter the OTP"}
          </DialogTitle>
        </DialogHeader>
        {step === "phone" ? (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (phone.replace(/\D/g, "").length !== 10) {
                toast.error("Enter a valid 10-digit mobile number");
                return;
              }
              setStep("otp");
              toast.success("OTP sent — use 1234 for this demo");
            }}
          >
            <label className="block text-sm font-medium" htmlFor="phone">
              Log in or sign up
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-input px-3">
              <span className="text-sm font-semibold text-muted-foreground">+91</span>
              <input
                id="phone"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile number"
                className="h-12 w-full bg-transparent text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground"
            >
              Continue
            </button>
          </form>
        ) : (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (otp !== "1234") {
                toast.error("Incorrect OTP. Use 1234 in this demo.");
                return;
              }
              signIn({ name: "Guest Shopper", phone });
              toast.success("Logged in");
            }}
          >
            <p className="text-sm text-muted-foreground">Sent to +91 {phone}</p>
            <input
              inputMode="numeric"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="4-digit OTP"
              className="h-12 w-full rounded-xl border border-input px-3 text-center text-lg tracking-[0.5em] outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground"
            >
              Verify
            </motion.button>
          </form>
        )}
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>
  );
}
