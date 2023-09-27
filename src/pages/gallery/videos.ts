const videos = [
	{
		folder: 'golf_cart_1',
		route: 'golf_cart_1',
		label: 'Golf Cart',
		next: 'golf_course_1',
	},
	{
		folder: 'golf_course_1',
		route: 'golf_course_1',
		label: 'Golf Course',
		next: 'lake_1',
		shorts: [
			{
				folder: 'golf_course_1/shorts/long_run',
				route: 'shorts/long_run',
				label: 'Long Run',
			}
		]
	},
	{
		folder: 'lake_1',
		route: 'lake_1',
		label: 'Lake',
		next: 'proving_grounds_1',
	},
	{
		folder: 'proving_grounds_1',
		route: 'proving_grounds_1',
		label: 'Proving Grounds',
		next: 'state_park_1',
	},
	{
		folder: 'state_park_1',
		route: 'state_park_1',
		label: 'State Park',
		next: 'golf_cart_1',
	},
]

export default videos