export function StepReview({ form }: any) {
  const values = form.getValues();

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Revisão</h3>
      <pre className="rounded bg-gray-100 p-4 text-sm">
        {JSON.stringify(values, null, 2)}
      </pre>
    </div>
  );
}
