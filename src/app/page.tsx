
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Form 1099 Mapper
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Simplify your tax preparation by automatically mapping your 1099 forms 
            to the correct Form 1040 lines. Process all major 1099 types with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/auth/signin"
              className="btn-primary text-lg px-8 py-3"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="btn-secondary text-lg px-8 py-3"
            >
              Create Account
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">All 1099 Types</h3>
              <p className="text-gray-600">
                Support for 1099-NEC, MISC, INT, DIV, B, R, G, K and more
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Auto Mapping</h3>
              <p className="text-gray-600">
                Automatically maps your 1099 data to the correct Form 1040 lines
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Export Reports</h3>
              <p className="text-gray-600">
                Generate summary reports and export data for your tax preparation
              </p>
            </div>
          </div>

          <div className="mt-16 p-6 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This tool is for informational purposes only and does not constitute tax advice. 
              Please consult with a qualified tax professional for your specific tax situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
