const videos = [
	// {
	// 	folder: 'golf_cart_1',
	// 	route: 'golf_cart_1',
	// 	label: 'Golf Cart Tour',
	// 	next: 'golf_course_1',
	// },
	{
		folder: 'golf_course_1',
		route: 'golf_course_1',
		label: 'Golf Course',
		next: 'lake_1',
		shorts: [
			{
				folder: 'golf_course_1/shorts/fairway',
				route: 'shorts/fairway',
				label: 'Fairway',
				next: 'lake_1',
			}
		]
	},
	{
		folder: 'lake_1',
		route: 'lake_1',
		label: 'Lake',
		next: 'tanglewood_launch_1',
	},
	{
		folder: 'tanglewood_launch_1',
		route: 'tanglewood_launch_1',
		label: 'Tanglewood Boat Launch (Avata)',
		next: 'state_park_1',
	},
	// {
	// 	folder: 'proving_grounds_2',
	// 	route: 'proving_grounds_2',
	// 	label: 'Tanglewood Boat Launch 2 (Nazgul)',
	// 	next: 'proving_grounds_3',
	// },
	// {
	// 	folder: 'proving_grounds_3',
	// 	route: 'proving_grounds_3',
	// 	label: 'Tanglewood Boat Launch 3 (Nazgul)',
	// 	next: 'state_park_1',
	// },
	{
		folder: 'state_park_1',
		route: 'state_park_1',
		label: 'State Park',
		next: 'high_flying_bird',
	},
	{
		folder: 'high_flying_bird',
		route: 'high_flying_bird',
		label: 'High Flying Bird',
		next: 'golf_cart_1',
		shorts: [
			{
				folder: 'high_flying_bird/shorts/fly_like_an_eagle',
				route: 'shorts/fly_like_an_eagle',
				label: 'Fly Like An Eagle',
				next: 'golf_cart_1'
			}
		]
	},
]

export default videos