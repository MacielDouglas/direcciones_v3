import { StepId } from "./steps.config";

type Step = {
  id: StepId;
  label: string;
};

type Props = {
  steps: Step[];
  currentStep: StepId;
  onStepClick: (step: StepId) => void;
};

export function StepIndicator({ steps, currentStep, onStepClick }: Props) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="space-y-4">
      <div className="h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-orange-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ol className="grid grid-cols-4 text-sm font-medium">
        {steps.map((step) => (
          <li
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`cursor-pointer text-center transition ${
              step.id === currentStep
                ? "text-orange-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {step.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
