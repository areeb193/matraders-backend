export default function BackendAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            🛠️ Backend Admin Panel
          </h1>
          <p className="text-sm text-gray-500">MongoDB + Next.js API Routes (Assignment)</p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
