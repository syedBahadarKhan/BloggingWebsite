import OptimizedImage from "../UI/OptimizedImage";

export default function AuthorCard({ author, authorName, authorImage, compact = false }) {
  const fields = author?.fields || {};
  const name = authorName || fields.name || fields.authorName || fields.AuthorName;
  const avatar = authorImage || fields.avatar || fields.authorImage || fields.AuthorImage;
  const { bio, role } = fields;
  const avatarUrl = avatar?.fields?.file?.url;

  if (!name && !avatarUrl) return null;

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
