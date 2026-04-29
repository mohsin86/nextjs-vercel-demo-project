type Props = {
  params: {
    id: string;
  };
};

export default function UserProfile({ params }: Props) {
  return (
    <div>
      <h1>User Profile: {params.id}</h1>
    </div>
  );
}