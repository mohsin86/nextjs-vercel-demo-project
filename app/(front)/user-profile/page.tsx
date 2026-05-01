type Props = {
  params: {
    username: string;
  };
};

export default function UserProfile({ params }: Props) {
  return (
    <div>
      <h1>User Profile: {params.username}</h1>
    </div>
  );
}