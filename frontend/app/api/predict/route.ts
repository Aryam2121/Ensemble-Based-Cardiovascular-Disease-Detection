import { type NextRequest, NextResponse } from "next/server"

// Real backend API integration for CVD prediction
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Call actual FastAPI backend
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000"
    const response = await fetch(`${backendUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Backend prediction error:", error)
    return NextResponse.json({ 
      error: "Failed to connect to prediction service",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
