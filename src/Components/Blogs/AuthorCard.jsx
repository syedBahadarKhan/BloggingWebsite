import OptimizedImage from "../ui/OptimizedImage";

export default function AuthorCard({ author, compact = false }) {
  if (!author?.fields) return null;

  const { name, avatar, bio, role } = author.fields;
  const avatarUrl = avatar?.fields?.file?.url;

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <OptimizedImage
          src={avatarUrl}
          alt={name}
          width={80}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">{name}</p>
          {role && <p className="text-xs text-gray-500">{role}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50">
      <OptimizedImage
        src={avatarUrl}
        alt={name}
        width={128}
        className="h-14 w-14 rounded-full object-cover flex-shrink-0"
      />
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        {role && <p className="text-sm text-blue-600 mb-1">{role}</p>}
        {bio && <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>}
      </div>
    </div>
  );
}
