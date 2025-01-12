import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useChildLongVacaion } from "../../_hooks/useChildLongVacaion";
import dayjs from "dayjs";

interface Props {
  childId: string;
  longVacationId: string;
  setLongVacationId: (longVacationId: string) => void;
}
export const VacationSlect: React.FC<Props> = ({
  childId,
  setLongVacationId,
  longVacationId,
}) => {
  const { data, error } = useChildLongVacaion({ childId });

  if (!data) return <div>読込み中</div>;
  if (error) return <div>休暇情報取得に失敗</div>;

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl sx={{ width: "100%" }} size="small">
        <Select
          value={longVacationId}
          onChange={e => setLongVacationId(e.target.value)}
        >
          {data.longVacations.map(longVacation => (
            <MenuItem key={longVacation.id} value={longVacation.id}>
              {longVacation.isActive ? "✅" : "　"}
              {longVacation.title} /
              {dayjs(longVacation.startDate).format("YYYY-M~")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
