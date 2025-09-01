import AcceptForm from "@/app/accepts/[id]/AcceptForm";

export default function AcceptPage({ params, searchParams }) {
  const { id } = params; // token
  const { name, email } = searchParams;

  return <AcceptForm token={id} name={name} email={email} />;
}
