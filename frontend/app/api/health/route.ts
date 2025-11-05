import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Call backend health endpoint
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || "https://ensemble-based-cardiovascular-disease.onrender.com"
    
    const response = await fetch(`${backendUrl}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend health check failed: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json({ 
      status: "unhealthy",
      error: "Failed to connect to backend service",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}