class RateLimiter {
  windowEndTime
  windowRate
  rate
  miliseconds

  constructor(rate, miliseconds) {
    this.windowRate = rate;
    this.rate = rate;
    this.miliseconds = miliseconds;
  }

  excecuteWithLimit(request) {
    const now = Date.now()
    if (!this.windowEndTime || now > this.windowEndTime) {
      this.windowEndTime = now + this.miliseconds
      this.windowRate = this.rate - 1
      request()
      return
    }
    if (this.windowRate === 0) {
      return '429 - Too Many Requests'
    }
    this.windowRate--
    request()
  }
}

const rateLimiter = new RateLimiter(3, 10 * 1000)
rateLimiter.excecuteWithLimit(() => console.log('primera'))
rateLimiter.excecuteWithLimit(() => console.log('segunda'))
rateLimiter.excecuteWithLimit(() => console.log('tercera'))
rateLimiter.excecuteWithLimit(() => console.log('cuarta')) // Too Many Requests
