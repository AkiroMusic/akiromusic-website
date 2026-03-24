import { ref, onMounted, onUnmounted } from 'vue'

export function useParticles(canvasRef) {
  const particles = []
  const particleCount = 40
  const mouse = { x: null, y: null }
  let animationId = null
  let ctx = null
  let canvas = null

  const createParticles = () => {
    particles.length = 0
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
      })
    }
  }

  const resize = () => {
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  const drawParticle = (p) => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 184, 0, ${p.opacity})`
    ctx.fill()
  }

  const drawLines = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(255, 184, 0, ${0.1 * (1 - dist / 100)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.x += (dx / dist) * 2
          p.y += (dy / dist) * 2
        }
      }

      p.x += p.speedX
      p.y += p.speedY

      // Wrap around
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      drawParticle(p)
    })

    drawLines()
    animationId = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e) => {
    // Check if mobile
    if (window.innerWidth <= 768) return
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  const handleMouseLeave = () => {
    mouse.x = null
    mouse.y = null
  }

  onMounted(() => {
    if (!canvasRef.value) return
    canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    resize()
    createParticles()
    animate()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseleave', handleMouseLeave)
  })

  return {
    particles
  }
}
