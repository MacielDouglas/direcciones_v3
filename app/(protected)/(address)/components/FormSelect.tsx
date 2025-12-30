import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldBase } from "./FormFieldBase";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: FormSelectProps<T>) {
  return (
    <FormFieldBase control={control} name={name} label={label}>
      {(field) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormFieldBase>
  );
}
