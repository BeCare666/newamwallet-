class CardSlider {
	constructor(cards, { slide = 0 }) {
		this.options = {
			margin: 27,
			width: 280,
			height: 150
		}
		this.cards = this.initCards(cards)
		this.slides = this.initSlides(cards)
		this.slide(slide)
		this.render()
	}
	
	setActiveCard(n) {
		// remove styles
		if (this.currentSlide !== undefined) {
			this.cards[this.currentSlide].classList.remove('card-active')
			this.slides[this.currentSlide].classList.remove('card-slider__item-active')
		}
		
		this.currentSlide = n
		
		this.cards[this.currentSlide].classList.add('card-active')
		this.slides[this.currentSlide].classList.add('card-slider__item-active')
	}

	generateCardTemplate(card) {
		return `
			${card.verified
				? '<div class="card-verified"></div>'
				: ''
			}
			<div class="card-info">
				<div>
					<p class="card-info__title">Current balance</p>
					<p class="card-info__balance">${card.balance}</p>
				</div>
				<div class="icon icon-visa card-info__logo"></div>
			</div>
			<div class="card-numbers">
				${('<div class="dots">' + '<div class="dot"></div>'.repeat(4) + '</div>').repeat(3)}
				<div>${card.number}</div>
			</div>
			<div class="card-date">
				<p>Nugget Card</p>
				<p>${card.date}</p>
			</div>
		`
	}
	
	initCards(cards) {
		const cardsElements = []

		for (let i = 0; i < cards.length; i++) {
			const newCard = document.createElement('div')
			newCard.classList.add('card')
			newCard.style.left = `${(this.options['width'] + this.options['margin']) * i}px`
			newCard.style.zIndex = String(i)
			newCard.innerHTML = this.generateCardTemplate(cards[i])
			cardsElements.push(newCard)
		}
		
		return cardsElements
	}
	
	initSlides(cards) {
		const slideElements = []
		
		for (let i = 0; i < cards.length; i++) {
			const slideItem = document.createElement('span')
			
			slideItem.classList.add('card-slider__item')
			slideItem.addEventListener('click', () => {
				this.slide(i)
			})
			slideElements.push(slideItem)
		}
		
		return slideElements
	}
	
	slide(item) {
		this.setActiveCard(item)

		const MAX_HEIGHT_CARD = this.options['height']
		const MULTIPLIER_HEIGHT = 0.9

		for (let i = 0; i <= item; i++) {
			this.cards[i].style.left = `${5 * i}px`

			if (i !== item)
				this.cards[i].style.height = `${MAX_HEIGHT_CARD * MULTIPLIER_HEIGHT ** (item - i)}px`
		}

		this.cards[item].style.height = ''

		for (let i = item + 1; i < this.cards.length; i++) {
			const offsetLeft = (this.options['width'] + this.options['margin']) * (i - item)
			this.cards[i].style.left = `${offsetLeft}px`
			this.cards[i].style.height = ''
		}
		
	}
	
	render(cardListClass = '.card-list', cardSliderClass = '.card-slider') {
		const cardList = document.querySelector(cardListClass)
		const cardSlider = document.querySelector(cardSliderClass)
		
		if (!cardList || !cardSlider) throw new Error('Render error')
		
		const cardListWrapper = document.createElement('div')
		
		this.cards.forEach(cardElement => cardListWrapper.appendChild(cardElement))
		this.slides.forEach(slideElement => cardSlider.appendChild(slideElement))
		
		cardList.appendChild(cardListWrapper)
	}
}

const cards = [
	{
		verified: false,
		balance: 7850.89,
		number: 1234,
		date: '28/07'
	},
	{
		verified: true,
		balance: 322,
		number: 4125,
		date: '16/03'
	},
	{
		verified: false,
		balance: 49.32,
		number: 9831,
		date: '07/09'
	},
	{
		verified: true,
		balance: 591.71,
		number: 3914,
		date: '02/01'
	},
	{
		verified: false,
		balance: 20.29,
		number: 5401,
		date: '19/05'
	}
]

new CardSlider(cards, { slide: 3 })
