"use client";
import { useParams } from "next/navigation";
import { PrintArea } from "../../../../../_components/PrintArea";
export default function ChildHomeworkImage() {
  const { id } = useParams();
  return <PrintArea childId={id as string} />;
}
