export function StepGps({ form }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Localização GPS</h3>
      <input {...form.register("gps")} className="input" />
    </div>
  );
}
