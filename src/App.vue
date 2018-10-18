<template>
	<div id="app">
		<div class="container mx-auto">
			<h1 class="my-4">Vue flux</h1>

			<p>You can use arrow keys to show next image (when no transition running). Double click to switch full screen mode.</p>

			<div class="sm:block md:block lg:flex xl:flex">
				<div class="lg:w-3/5 px-2 mb-4">
					<vue-flux :options="fluxOptions" :images="fluxImages" :transitions="fluxTransitions" :captions="fluxCaptions" ref="slider">
						<flux-caption slot="caption"></flux-caption>
						<flux-controls slot="controls"></flux-controls>
						<flux-index slot="index"></flux-index>
						<flux-pagination slot="pagination"></flux-pagination>
					</vue-flux>
				</div>

				<div class="lg:w-2/5 px-2 mb-4 transitions">
					<h4 class="mb-2">2D Transitions</h4>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionFade')" @click="showNext('transitionFade')">Fade</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionKenburn')" @click="showNext('transitionKenburn')">Kenburn</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionSwipe')" @click="showNext('transitionSwipe')">Swipe</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionSlide')" @click="showNext('transitionSlide')">Slide</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionWaterfall')" :class="transitionClass('transitionWaterfall')">Waterfall</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('transitionZip')" :class="transitionClass('transitionZip')">Zip</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionBlinds2d')" :class="transitionClass('transitionBlinds2d')">Blinds 2D</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionBlocks1')" :class="transitionClass('transitionBlocks1')">Blocks 1</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionBlocks2')" :class="transitionClass('transitionBlocks2')">Blocks 2</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionConcentric')" :class="transitionClass('transitionConcentric')">Concentric</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('transitionWarp')" :class="transitionClass('transitionWarp')">Warp</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionCamera')" :class="transitionClass('transitionCamera')">Camera</a>
						</li>
					</ul>

					<h4 class="mt-5 mb-2">3D Transitions</h4>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionCube')" @click="showNext('transitionCube')">Cube</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('transitionBook')" :class="transitionClass('transitionBook')">Book</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionFall')" :class="transitionClass('transitionFall')">Fall</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionWave')" :class="transitionClass('transitionWave')">Wave</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionBlinds3d')" :class="transitionClass('transitionBlinds3d')">Blinds 3D</a>
						</li>
					</ul>

					<ul class="list-reset flex">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionRound1')" :class="transitionClass('transitionRound1')">Round 1</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('transitionRound2')" :class="transitionClass('transitionRound2')">Round 2</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionExplode')" :class="transitionClass('transitionExplode')">Explode</a>
						</li>
					</ul>
				</div>
			</div>

			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam turpis enim, scelerisque vitae tellus quis, vulputate pulvinar lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a lobortis enim. Donec pellentesque enim at vulputate tempus. Suspendisse ultricies elementum sem id porta. Suspendisse arcu nisi, luctus et malesuada at, dignissim et tortor. Sed ullamcorper sapien lacinia eros commodo, ut vestibulum metus gravida. Morbi at est sollicitudin, viverra mauris et, tincidunt felis. Morbi et ornare lorem. Praesent vel consequat enim. Nunc urna ante, consequat eget egestas et, mollis et lacus. Donec sed fringilla nunc, ut vestibulum metus. Vivamus suscipit efficitur efficitur. Nunc id feugiat ante, non faucibus arcu.</p>

			<p>Curabitur vitae leo bibendum, ullamcorper dui ut, scelerisque orci. Curabitur volutpat consectetur ligula eu venenatis. Nulla vitae tellus nisi. Donec ac velit augue. Integer vel turpis suscipit, vehicula turpis cursus, dapibus metus. Sed dictum ex eget enim dictum, vitae lobortis urna finibus. Nulla vestibulum rhoncus arcu sit amet maximus. Morbi semper porttitor pulvinar.</p>

			<p>Cras at dolor fringilla purus consequat fringilla. Cras maximus sem sapien, aliquam egestas enim feugiat quis. Fusce et ante elementum, tristique nisl ac, convallis turpis. Fusce dui eros, blandit sit amet ante sit amet, bibendum mollis neque. Morbi varius tincidunt massa vitae molestie. Phasellus posuere non sapien ac condimentum. Aliquam tempor eu libero et vehicula. Morbi quis mi nec neque porttitor porttitor vel vel sem. Duis pretium felis sit amet tortor tristique vehicula. Morbi gravida tempus neque, et hendrerit urna suscipit a. Curabitur finibus tellus at sapien placerat, et dapibus nisi gravida. Sed sit amet dapibus sem. Ut dapibus turpis mi, sit amet vestibulum metus rutrum sed. Pellentesque posuere sollicitudin ipsum quis euismod.</p>

			<p>Nunc efficitur ut quam sit amet dictum. Curabitur vitae aliquet tellus. Nam eu tristique urna. Curabitur vel ligula pharetra, sodales ex at, eleifend nulla. Phasellus neque eros, venenatis sit amet enim sed, mollis tincidunt arcu. Praesent non arcu sodales dui malesuada tincidunt vitae sed sem. Proin sodales risus leo, nec rhoncus libero pretium et. Praesent ullamcorper elit elit, eu condimentum felis imperdiet non. Cras volutpat elit sit amet est volutpat, auctor laoreet lorem posuere. Nullam tempus viverra blandit. Mauris vitae euismod justo, et aliquam enim. Etiam finibus enim vitae metus egestas efficitur. Vivamus eu ultrices mi. Mauris tempus mauris ac diam sagittis, eget varius est imperdiet. Proin molestie congue velit, vitae malesuada eros bibendum sed. Nunc consectetur, turpis quis dictum elementum, mi erat euismod justo, sit amet posuere ante turpis nec orci.</p>

			<p>Duis faucibus nunc tellus, eget lobortis erat vulputate a. Nulla tincidunt est sed nisi lacinia eleifend. Maecenas semper in sem volutpat condimentum. Integer scelerisque justo enim, at tincidunt urna feugiat vitae. Quisque consectetur ex felis, auctor mattis magna iaculis sit amet. Donec nulla sapien, hendrerit eget nulla at, elementum scelerisque tortor. Donec sodales mauris porta nisi eleifend, non hendrerit purus rhoncus. Etiam feugiat justo vel tortor congue elementum vitae vitae nunc. Praesent faucibus convallis dictum. Maecenas ac nulla nisi. In at purus hendrerit, auctor velit in, lobortis sem. Ut eu justo erat. Pellentesque sapien dui, elementum a magna nec, porta placerat felis. Nunc vel nunc nec nisl venenatis imperdiet.</p>

			<p>Integer augue risus, varius et ante a, ornare cursus nulla. Nullam ultrices varius justo, sed ultricies dui pulvinar ac. Phasellus vehicula luctus sem, nec porta quam venenatis quis. Vestibulum commodo nulla eget est interdum dignissim. Nunc ultricies arcu a neque egestas, non pulvinar nunc semper. Vivamus nec ante nec est imperdiet rhoncus et vel sapien. Aenean iaculis ornare leo sit amet ornare. Nulla facilisi. Vivamus id eros tempus, auctor dolor et, sodales enim. Morbi gravida tempus est, ac rhoncus arcu placerat nec. Nunc consectetur turpis at metus placerat, quis ultricies mi tempus. Curabitur eget tortor quis erat rhoncus feugiat at at sapien.</p>

			<p>Proin consectetur non ipsum quis tempus. Cras quis condimentum tellus. Curabitur quis efficitur urna, sit amet pellentesque diam. Nullam ante turpis, finibus eu quam ut, euismod dapibus justo. Fusce libero massa, fringilla quis leo at, varius imperdiet sem. Fusce facilisis commodo diam, sit amet ornare sapien commodo a. Vestibulum porttitor venenatis augue id pretium. Integer et eleifend nisl, id aliquet mi. Vestibulum luctus viverra eros. In eu nisi non magna ultrices cursus. Donec ut pellentesque risus, vel feugiat elit. Ut non dignissim elit. Sed eget lacus ullamcorper, cursus orci vel, aliquet tortor.</p>

			<p>Duis dapibus gravida urna eu dapibus. Donec convallis laoreet lacus condimentum efficitur. Donec egestas pellentesque rhoncus. Quisque luctus dignissim mi in condimentum. Ut blandit placerat fringilla. Sed arcu velit, consequat et vestibulum vitae, molestie vel odio. Aliquam eu quam accumsan, vestibulum est vitae, congue eros. Cras porta nec tortor at convallis. Nam lobortis libero et elit dictum, sit amet dignissim libero aliquet. Aenean pellentesque enim sit amet diam sollicitudin vulputate. Suspendisse venenatis velit ligula, at faucibus magna sollicitudin eu. Aenean tincidunt ipsum vitae dui accumsan rutrum. Nulla ut magna nibh. Nullam posuere, purus vel tincidunt dapibus, sem magna malesuada eros, semper rhoncus urna ligula nec dui.</p>

			<p>Suspendisse elit felis, vehicula a feugiat eget, auctor id urna. Aliquam erat volutpat. Donec sit amet ligula sed turpis consequat malesuada. Vestibulum quis tellus pulvinar, convallis ex a, dapibus tortor. Proin pellentesque augue ut justo porttitor malesuada. Duis ac quam tristique dui venenatis rutrum. Vivamus sit amet porta ligula, non scelerisque tortor. Sed vel libero malesuada augue aliquet molestie. Maecenas ut velit at sapien tincidunt consectetur. Vivamus condimentum pretium odio, suscipit varius tellus porttitor et. Etiam pretium condimentum congue. Duis viverra, est id laoreet vehicula, magna ipsum efficitur velit, non maximus sapien enim et tortor. Morbi iaculis odio a eros fringilla, nec iaculis nibh ullamcorper.</p>

			<p>Donec lobortis, ligula eget euismod accumsan, magna ligula fermentum elit, id cursus tortor purus id sem. Praesent dignissim nulla et ligula feugiat ultricies. Nam vel dignissim massa. Fusce porttitor posuere orci. Cras laoreet diam est, sed efficitur libero fermentum ac. Phasellus cursus tincidunt arcu, faucibus iaculis velit imperdiet vel. Sed iaculis purus tellus, vel semper ipsum consectetur a. Phasellus eget nunc risus. Donec iaculis eu mi vitae viverra. Curabitur porta bibendum orci, et efficitur dolor molestie et. Nullam convallis egestas nulla in scelerisque. Cras hendrerit, nulla id lacinia molestie, elit justo vulputate eros, sed volutpat massa velit vitae felis. Cras efficitur sem vitae lorem fermentum, at rhoncus diam elementum. Mauris auctor ornare ipsum, in suscipit arcu tincidunt tincidunt.</p>

			<p>Nulla hendrerit eu arcu non rhoncus. Mauris sed enim lorem. Nulla facilisi. Phasellus lacinia aliquam turpis, eu efficitur lacus ornare vel. Maecenas finibus tortor egestas, convallis augue at, blandit odio. Nunc efficitur accumsan aliquet. Sed facilisis erat sed magna rhoncus lobortis. Nunc bibendum tempor dolor, eu viverra felis sagittis vel. Fusce at ultrices ligula. Duis convallis, nulla at porta ultricies, lorem dolor consectetur massa, ac pellentesque tellus lectus quis leo. Integer id ipsum eu orci porttitor volutpat. Etiam et commodo tortor, in sagittis arcu. Vivamus tristique vestibulum leo, ut ultrices enim mollis ac.</p>

			<h2>Relative</h2>

			<flux-parallax src="slides/1.jpg" height="300px" type="relative" offset="80%">
				<div>CONTENT</div>
			</flux-parallax>

			<h2 class="mt-4">Static</h2>

			<flux-parallax src="slides/1.jpg" height="300px" type="static" offset="80%">
				<div>CONTENT</div>
			</flux-parallax>

			<h2 class="mt-4">Fixed</h2>

			<flux-parallax src="slides/1.jpg" height="300px" type="fixed" offset="80%">
				<div>CONTENT</div>
			</flux-parallax>

			<p>Aenean vestibulum egestas ipsum quis interdum. Fusce semper tincidunt sem, ut posuere nisl porta sed. Quisque pharetra imperdiet nulla sed cursus. Fusce fringilla tempor lacinia. In condimentum felis diam, quis hendrerit nisl dapibus ut. Quisque placerat ex sed accumsan volutpat. Nunc pellentesque dui eget quam tempus lacinia. Sed convallis sed neque suscipit consectetur. Etiam vehicula luctus dui ut pulvinar. Vestibulum mattis consectetur purus ut aliquet. Proin placerat consectetur blandit. Mauris sagittis ultricies felis in porttitor.</p>

			<p>Vivamus ac sodales sapien. Vestibulum malesuada ultricies nisl, eget convallis quam lacinia a. Ut eget dolor nisi. Donec nec augue tincidunt, ultricies metus sed, pretium turpis. Ut maximus, dolor non imperdiet finibus, sapien est maximus urna, tristique euismod erat nisl finibus erat. Nullam facilisis, risus eget dapibus blandit, orci nunc cursus mi, at luctus urna libero nec odio. In a diam nunc.</p>

			<p>Vestibulum vestibulum dictum ultricies. Nullam facilisis non massa vitae pretium. Nulla posuere ipsum at sollicitudin fringilla. Fusce ultrices molestie elit, id dignissim ipsum vestibulum nec. Pellentesque dignissim quam non dolor luctus finibus. Donec consectetur, lectus tristique hendrerit ornare, orci quam lobortis nibh, non volutpat risus neque non quam. Donec bibendum dolor sed risus convallis fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eu quam dapibus, blandit ex at, fermentum libero. Cras ut fermentum eros. Aenean metus elit, commodo sit amet erat non, consequat lobortis enim. Aliquam iaculis ipsum ut felis condimentum, non iaculis est sodales. Nulla rutrum, urna eu elementum egestas, nisi neque vestibulum orci, vitae gravida enim metus vitae felis. Nulla mattis purus commodo nisi luctus, ac ornare enim cursus.</p>

			<p>Pellentesque eu ex sit amet felis commodo eleifend ut quis turpis. Praesent rhoncus pharetra risus, in sodales sapien dictum sit amet. Maecenas id ex auctor, ultricies diam sit amet, tempor nisi. Cras nec molestie erat. Pellentesque non mauris condimentum, placerat dui at, imperdiet dolor. Cras erat nisl, ullamcorper at odio id, pharetra lobortis lacus. Quisque turpis urna, porta vel urna at, pellentesque iaculis odio. Maecenas id rhoncus orci. Nullam elementum mi at interdum blandit. Pellentesque et tincidunt augue, a interdum dolor. Aenean quis quam mi. Nullam molestie, tellus blandit bibendum maximus, elit nisl imperdiet nunc, sit amet egestas ipsum nisl vel turpis. Nunc non eleifend augue. Fusce nec ligula felis. Sed sed luctus nunc. Etiam dapibus eros vel metus consequat condimentum.</p>

			<p>Donec vel felis quam. Mauris convallis sed augue ac gravida. Duis in lorem dolor. Sed velit metus, molestie vitae lectus eu, pellentesque sollicitudin sapien. Aliquam venenatis consequat posuere. In iaculis, nibh vel finibus varius, diam sapien vehicula lectus, iaculis dictum lacus lorem quis libero. Morbi in sollicitudin diam. Praesent vitae eros sapien.</p>

			<p>Praesent ut lorem eget nunc imperdiet molestie quis ac tellus. Fusce massa ex, egestas luctus aliquam id, sagittis id justo. Phasellus congue dolor dolor, id blandit diam malesuada non. Morbi sed risus vel mi dignissim varius. Nunc dignissim justo pharetra neque porta, malesuada posuere nulla rhoncus. Aliquam id orci sed orci varius accumsan. Nam eu tortor est. Vestibulum gravida, enim in hendrerit hendrerit, ante tellus malesuada libero, pulvinar rhoncus neque ex nec purus. Vivamus consequat volutpat quam, non sodales erat vestibulum quis.</p>

			<p>Aliquam quis sem ut purus eleifend accumsan. Aenean consectetur lacus ac nibh condimentum, vel ultricies sapien laoreet. Pellentesque turpis arcu, convallis non tortor vitae, vulputate convallis risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla id eros id diam varius feugiat nec eget dolor. Mauris sollicitudin nibh lorem, laoreet fermentum nunc iaculis sit amet. Nullam ultricies pellentesque nisl rhoncus ultrices. Nulla facilisi. Suspendisse blandit ante dapibus, mollis neque id, finibus nulla. Donec id nibh interdum, aliquet nisl ut, faucibus enim. Cras luctus purus vel elit rhoncus, et lobortis orci hendrerit. Quisque facilisis sollicitudin sapien, at pretium massa luctus non. Integer id est dapibus, tincidunt neque id, elementum nunc. Fusce egestas lorem ac venenatis tempor.</p>

			<p>Quisque leo justo, bibendum vel suscipit non, dapibus ut nisl. Etiam vehicula ultricies imperdiet. Curabitur venenatis condimentum iaculis. Aliquam lorem erat, lobortis vitae nunc tempor, rutrum tempus mi. Nunc blandit suscipit tortor, at efficitur quam vehicula id. Morbi a est ac tortor malesuada consectetur. Fusce tellus lorem, aliquet non facilisis in, fringilla ut augue. Proin eu viverra lectus. Pellentesque gravida mauris eu orci convallis porttitor. Quisque interdum eu odio et accumsan. Sed ac ex mattis, imperdiet nunc vel, tempor lorem. Pellentesque tincidunt id mauris non tincidunt. Fusce a auctor nulla. Donec eu porta sem. Sed tristique massa massa, non porttitor lorem lobortis ac. Nulla pretium posuere gravida.</p>

			<p>Donec vitae malesuada risus, in varius nunc. Nulla ut nibh vitae nulla ultricies tempor. Proin mattis felis felis, ac dapibus nunc sollicitudin facilisis. Ut sit amet turpis ac metus malesuada auctor. Nunc vulputate dictum nisi, a vulputate nunc eleifend ut. Nulla viverra turpis at fermentum consectetur. Integer varius consectetur sapien non posuere. Nullam venenatis mattis orci vitae tincidunt. Donec imperdiet lacus sed risus sagittis, a interdum sapien mollis. Donec ac aliquet velit. Quisque luctus urna vel urna fringilla accumsan sit amet ut nibh. Donec scelerisque massa id ligula dictum ullamcorper.</p>
		</div>
	</div>
</template>

<script>
	import VueFlux from './components/VueFlux.vue';
	import FluxCaption from './components/FluxCaption.vue';
	import FluxControls from './components/FluxControls.vue';
	import FluxIndex from './components/FluxIndex.vue';
	import FluxPagination from './components/FluxPagination.vue';
	import Transitions from './components/transitions/index.js';
	import FluxParallax from './components/FluxParallax.vue';

	export default {
		name: 'app',

		components: {
			VueFlux,
			FluxCaption,
			FluxControls,
			FluxIndex,
			FluxPagination,
			FluxParallax
		},

		data: () => ({
			rendered: false,
			baseTransitionClass: 'text-center whitespace-no-wrap block border border-grey-light rounded text-white cursor-pointer py-2 px-4 shadow-md',
			activeTransitionClass: 'bg-black',
			inactiveTransitionClass: 'bg-grey-darkest hover:bg-black',
			fluxOptions: {
				autoplay: true,
				bindKeys: true,
				fullscreen: true
			},
			fluxImages: [
				'slides/1.jpg',
				'slides/2.jpg',
				'slides/3.jpg',
				'slides/4.jpg',
				'slides/5.jpg',
				'slides/6.jpg',
			],
			fluxTransitions: Transitions,
			fluxCaptions: [ 'First caption', 'Second caption', undefined, 'Fourth caption' ]
		}),

		computed: {
			currentTransition: function() {
				if (!this.rendered || !this.$refs.slider || !this.$refs.slider.transition)
					return undefined;

				return this.$refs.slider.transition.current;
			}
		},

		mounted() {
			this.rendered = true;
		},

		methods: {
			showNext(transition) {
				this.$refs.slider.showImage('next', transition);
			},

			transitionClass(transition) {
				let tClass = this.baseTransitionClass;

				if (this.currentTransition === transition)
					tClass += ' '+ this.activeTransitionClass;

				else
					tClass += ' '+ this.inactiveTransitionClass;

				return tClass;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vue-flux {
		box-shadow: 0 0 12px 2px rgba(34,36,38,.85);
	}

	.transitions a {
		font-size: .975rem;
	}

	.flux-parallax {
		display: flex;
		position: relative;
		font-size: 3rem;
		color: white;
		font-weight: bold;
		justify-content: center;
		align-items: center;
		text-shadow:
			-2px -2px 0 black,
			 2px -2px 0 black,
			-2px  2px 0 black,
			 2px  2px 0 black;
	}

	p {
		margin: 24px 0;
	}
</style>
