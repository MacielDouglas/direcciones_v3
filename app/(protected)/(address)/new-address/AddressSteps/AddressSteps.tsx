"use client";

import { startTransition, useEffect, useState } from "react";
import { StepId, STEPS } from "./steps.config";
import { useForm } from "react-hook-form";
import { AddressFormData, addressSchema } from "../address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddress } from "../address.actions";
import { StepIndicator } from "./StepIndicator";
import { StepAddress } from "./steps/StepAddress";
import { StepGps } from "./steps/StepGps";
import { StepImage } from "./steps/StepImage";
import { StepReview } from "./steps/StepReview";
import { Button } from "@/components/ui/button";

export default function AddressSteps() {
  const [step, setStep] = useState<StepId>(1);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      type: "House",
      businessName: "",
      street: "",
      number: "",
      neighborhood: "",
      gps: "",
      info: "",
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const goToStep = (target: StepId) => setStep(target);
  const next = () => step < 4 && setStep((s) => (s + 1) as StepId);
  const prev = () => step > 1 && setStep((s) => (s - 1) as StepId);

  const onSubmit = (data: AddressFormData) => {
    startTransition(async () => {
      await createAddress(data);
      form.reset();
      setStep(1);
    });
  };

  return (
    <section className="space-y-8">
      <StepIndicator steps={STEPS} currentStep={step} onStepClick={goToStep} />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && <StepAddress form={form} />}
        {step === 2 && <StepGps form={form} />}
        {step === 3 && <StepImage form={form} />}
        {step === 4 && <StepReview form={form} />}

        <div className="flex justify-between pt-6">
          <Button type="button" onClick={prev} disabled={step === 1}>
            Voltar
          </Button>
          {step < 4 ? (
            <Button type="button" onClick={next} className="btn-primary">
              Avançar
            </Button>
          ) : (
            <button type="submit" className="btn-primary">
              Confirmar e Enviar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
