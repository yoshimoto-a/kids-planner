import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useChildren } from "@/app/(member)/_hooks/useChildren";
import { useEffect } from "react";

interface Props {
  childrenIds: string[];
  setChildIds: (childrenIds: string[]) => void;
}
export const MultiChildSelect: React.FC<Props> = ({
  setChildIds,
  childrenIds,
}) => {
  const { data, error } = useChildren();
  useEffect(() => {
    if (!data) return;
    setChildIds(data.children.map(child => child.id));
  }, [data, setChildIds]);
  if (!data) return <div>読込み中</div>;
  if (error) return <div>子供情報取得に失敗</div>;

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    setChildIds(e.target.value as string[]);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>こども</InputLabel>
        <Select multiple value={childrenIds} onChange={handleChange}>
          {data.children.map(child => (
            <MenuItem key={child.id} value={child.id}>
              {child.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
