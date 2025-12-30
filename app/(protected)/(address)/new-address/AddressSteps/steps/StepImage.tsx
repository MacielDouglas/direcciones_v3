export function StepImage({ form }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Imagem do Local</h3>
      <input
        type="file"
        onChange={(e) => form.setValue("image", e.target.files?.[0])}
      />
    </div>
  );
}
