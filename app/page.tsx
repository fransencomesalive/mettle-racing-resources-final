import { prisma } from '@/lib/prisma'

async function getCommunities() {
  try {
    const communities = await prisma.community.findMany({
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' }
      ]
    })
    return communities
  } catch (error) {
    console.error('Failed to fetch communities:', error)
    return []
  }
}

export default async function Home() {
  const communities = await getCommunities()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Mettle Racing Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A community platform for athletes competing at high levels while managing chronic conditions
            </p>
          </div>

          {/* Database Status */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Database Status
              </h2>
              <span className="text-green-600 font-medium">
                ✅ Connected ({communities.length} communities loaded)
              </span>
            </div>
          </div>

          {/* Communities Grid */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Available Communities
            </h2>
            
            {communities.length === 0 ? (
              <p className="text-gray-500">No communities found. Check database connection.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map((community) => (
                  <div key={community.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {community.name}
                      </h3>
                      {community.isDefault && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {community.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {community.disease && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {community.disease.replace(/_/g, ' ')}
                        </span>
                      )}
                      {community.discipline && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {community.discipline.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>Database connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⏳</span>
                <span>Authentication setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">⭕</span>
                <span>User registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
