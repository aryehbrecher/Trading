export function validateTrade(data) {
  const errors = {}

  if (!data.ticker?.trim()) errors.ticker = 'Required'
  if (!data.optionType) errors.optionType = 'Required'
  if (!data.side) errors.side = 'Required'
  if (!data.strikePrice || Number(data.strikePrice) <= 0) errors.strikePrice = 'Must be > 0'
  if (!data.expirationDate) errors.expirationDate = 'Required'
  if (!data.quantity || Number(data.quantity) <= 0) errors.quantity = 'Must be > 0'
  if (!data.premium || Number(data.premium) <= 0) errors.premium = 'Must be > 0'
  if (!data.dateOpened) errors.dateOpened = 'Required'

  if (data.dateClosed && !data.closingPrice) errors.closingPrice = 'Required when date closed is set'
  if (data.closingPrice && !data.dateClosed) errors.dateClosed = 'Required when closing price is set'
  if (data.closingPrice && Number(data.closingPrice) < 0) errors.closingPrice = 'Must be >= 0'

  if (data.dateClosed && data.dateOpened && data.dateClosed < data.dateOpened) {
    errors.dateClosed = 'Must be after open date'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

export function validateAlert(data) {
  const errors = {}

  if (!data.ticker?.trim()) errors.ticker = 'Required'
  if (!data.optionType) errors.optionType = 'Required'
  if (!data.strikePrice || Number(data.strikePrice) <= 0) errors.strikePrice = 'Must be > 0'
  if (!data.expirationDate) errors.expirationDate = 'Required'
  if (!data.entryPriceMin || Number(data.entryPriceMin) <= 0) errors.entryPriceMin = 'Must be > 0'
  if (!data.entryPriceMax || Number(data.entryPriceMax) <= 0) errors.entryPriceMax = 'Must be > 0'
  if (data.entryPriceMin && data.entryPriceMax && Number(data.entryPriceMin) > Number(data.entryPriceMax)) {
    errors.entryPriceMax = 'Must be >= min'
  }
  if (!data.targetPrice || Number(data.targetPrice) <= 0) errors.targetPrice = 'Must be > 0'
  if (!data.stopLoss || Number(data.stopLoss) < 0) errors.stopLoss = 'Must be >= 0'

  return { valid: Object.keys(errors).length === 0, errors }
}
