module.exports.mainRoutes = [
	{
		name: "home",
		route: "/",
		method: ["get"],
		module: "home"
	}
]

module.exports.errorRoutes = {
	"404": {
		module: "404"
	},
	"500":{
		module: "500"
	}
}