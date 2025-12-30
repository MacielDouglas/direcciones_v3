import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldBase } from "./FormFieldBase";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: FormInputProps<T>) {
  return (
    <FormFieldBase control={control} name={name} label={label}>
      {(field) => (
        <Input
          {...field}
          placeholder={placeholder}
          className="h-12 text-base"
        />
      )}
    </FormFieldBase>
  );
}
