import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useChildren } from "@/app/(member)/_hooks/useChildren";

interface Props {
  childId: string;
  setChildId: (childId: string) => void;
}
export const SingleChildSelect: React.FC<Props> = ({ setChildId, childId }) => {
  const { data, error } = useChildren();

  if (!data) return <div>読込み中</div>;
  if (error) return <div>子供情報取得に失敗</div>;

  const handleChange = (e: SelectChangeEvent<string>) => {
    setChildId(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>こども</InputLabel>
        <Select value={childId} onChange={handleChange}>
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
