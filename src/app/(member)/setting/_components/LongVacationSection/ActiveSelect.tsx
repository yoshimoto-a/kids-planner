import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  isActive: (boolean | null)[];
  setIsActive: (isActive: (boolean | null)[]) => void;
}
export const ActiveSelect: React.FC<Props> = ({ isActive, setIsActive }) => {
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const values = e.target.value as string[];
    setIsActive(
      values.map(value =>
        value === "有効" ? true : value === "無効" ? false : null
      )
    );
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>アクティブ</InputLabel>
        <Select
          multiple
          value={
            isActive.includes(null)
              ? ["有効", "無効"]
              : isActive.map(val => (val === true ? "有効" : "無効"))
          }
          onChange={handleChange}
        >
          <MenuItem value="有効">有効</MenuItem>
          <MenuItem value="無効">無効</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
