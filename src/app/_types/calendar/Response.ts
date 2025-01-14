type Event = {
  id: string;
  groupId: string;
  name: string;
  title: string;
  start: string;
  end: string;
  submitted: boolean;
  url: string;
  color: string;
};
export interface Response {
  events: Event[];
}
