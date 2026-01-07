"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8585],{5476:function(e,t,n){n.d(t,{x:function(){return s}});var i=n(1119),r=n(2265),a=n(3717),o=n(1257);let s=r.forwardRef(({sdfGlyphSize:e=64,anchorX:t="center",anchorY:s="middle",font:l,fontSize:c=1,children:d,characters:u,onSync:f,...p},h)=>{let{Text:m,preloadFont:v}=(0,o.Rq)(async()=>n.e(5231).then(n.bind(n,5231)),[]),y=(0,a.A)(({invalidate:e})=>e),[g]=r.useState(()=>new m),[x,S]=r.useMemo(()=>{let e=[],t="";return r.Children.forEach(d,n=>{"string"==typeof n||"number"==typeof n?t+=n:e.push(n)}),[e,t]},[d]);return(0,o.Rq)(()=>new Promise(e=>v({font:l,characters:u},e)),["troika-text",l,u]),r.useLayoutEffect(()=>void g.sync(()=>{y(),f&&f(g)})),r.useEffect(()=>()=>g.dispose(),[g]),r.createElement("primitive",(0,i.Z)({object:g,ref:h,font:l,text:S,anchorX:t,anchorY:s,fontSize:c,sdfGlyphSize:e},p),x)})},8585:function(e,t,n){let i,r;n.r(t),n.d(t,{default:function(){return W}});var a=n(7437),o=n(2265),s=n(3717),l=n(6496),c=n(1119);let d=function(e,t){let n=e+"Geometry";return o.forwardRef(({args:e,children:t,...i},r)=>{let a=o.useRef(null);return o.useImperativeHandle(r,()=>a.current),o.useLayoutEffect(()=>void 0),o.createElement("mesh",(0,c.Z)({ref:a},i),o.createElement(n,{attach:"geometry",args:e}),t)})}("sphere");var u=n(1448);let f=new u.Box3,p=new u.Vector3;class h extends u.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new u.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new u.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new u.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new u.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new u.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new u.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new u.InterleavedBufferAttribute(i,t,0)),this.setAttribute("instanceColorEnd",new u.InterleavedBufferAttribute(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new u.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new u.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),f.setFromBufferAttribute(t),this.boundingBox.union(f))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new u.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)p.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(p)),p.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(p));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}let m=parseInt(u.REVISION.replace(/\D+/g,""));class v extends u.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:u.UniformsUtils.clone(u.UniformsUtils.merge([u.UniformsLib.common,u.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new u.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${m>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let y=m>=125?"uv1":"uv2",g=new u.Vector4,x=new u.Vector3,S=new u.Vector3,w=new u.Vector4,b=new u.Vector4,E=new u.Vector4,M=new u.Vector3,A=new u.Matrix4,_=new u.Line3,L=new u.Vector3,z=new u.Box3,U=new u.Sphere,C=new u.Vector4;function j(e,t,n){return C.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),C.multiplyScalar(1/C.w),C.x=r/n.width,C.y=r/n.height,C.applyMatrix4(e.projectionMatrixInverse),C.multiplyScalar(1/C.w),Math.abs(Math.max(C.x,C.y))}class B extends u.Mesh{constructor(e=new h,t=new v({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,a=t.count;e<a;e++,r+=2)x.fromBufferAttribute(t,e),S.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+x.distanceTo(S);let r=new u.InstancedInterleavedBuffer(i,2,1);return e.setAttribute("instanceDistanceStart",new u.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new u.InterleavedBufferAttribute(r,1,1)),this}raycast(e,t){let n,a;let o=this.material.worldUnits,s=e.camera;null!==s||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;i=e.ray;let c=this.matrixWorld,d=this.geometry,f=this.material;if(r=f.linewidth+l,null===d.boundingSphere&&d.computeBoundingSphere(),U.copy(d.boundingSphere).applyMatrix4(c),o)n=.5*r;else{let e=Math.max(s.near,U.distanceToPoint(i.origin));n=j(s,e,f.resolution)}if(U.radius+=n,!1!==i.intersectsSphere(U)){if(null===d.boundingBox&&d.computeBoundingBox(),z.copy(d.boundingBox).applyMatrix4(c),o)a=.5*r;else{let e=Math.max(s.near,z.distanceToPoint(i.origin));a=j(s,e,f.resolution)}z.expandByScalar(a),!1!==i.intersectsBox(z)&&(o?function(e,t){let n=e.matrixWorld,a=e.geometry,o=a.attributes.instanceStart,s=a.attributes.instanceEnd,l=Math.min(a.instanceCount,o.count);for(let a=0;a<l;a++){_.start.fromBufferAttribute(o,a),_.end.fromBufferAttribute(s,a),_.applyMatrix4(n);let l=new u.Vector3,c=new u.Vector3;i.distanceSqToSegment(_.start,_.end,c,l),c.distanceTo(l)<.5*r&&t.push({point:c,pointOnLine:l,distance:i.origin.distanceTo(c),object:e,face:null,faceIndex:a,uv:null,[y]:null})}}(this,t):function(e,t,n){let a=t.projectionMatrix,o=e.material.resolution,s=e.matrixWorld,l=e.geometry,c=l.attributes.instanceStart,d=l.attributes.instanceEnd,f=Math.min(l.instanceCount,c.count),p=-t.near;i.at(1,E),E.w=1,E.applyMatrix4(t.matrixWorldInverse),E.applyMatrix4(a),E.multiplyScalar(1/E.w),E.x*=o.x/2,E.y*=o.y/2,E.z=0,M.copy(E),A.multiplyMatrices(t.matrixWorldInverse,s);for(let t=0;t<f;t++){if(w.fromBufferAttribute(c,t),b.fromBufferAttribute(d,t),w.w=1,b.w=1,w.applyMatrix4(A),b.applyMatrix4(A),w.z>p&&b.z>p)continue;if(w.z>p){let e=w.z-b.z,t=(w.z-p)/e;w.lerp(b,t)}else if(b.z>p){let e=b.z-w.z,t=(b.z-p)/e;b.lerp(w,t)}w.applyMatrix4(a),b.applyMatrix4(a),w.multiplyScalar(1/w.w),b.multiplyScalar(1/b.w),w.x*=o.x/2,w.y*=o.y/2,b.x*=o.x/2,b.y*=o.y/2,_.start.copy(w),_.start.z=0,_.end.copy(b),_.end.z=0;let l=_.closestPointToPointParameter(M,!0);_.at(l,L);let f=u.MathUtils.lerp(w.z,b.z,l),h=f>=-1&&f<=1,m=M.distanceTo(L)<.5*r;if(h&&m){_.start.fromBufferAttribute(c,t),_.end.fromBufferAttribute(d,t),_.start.applyMatrix4(s),_.end.applyMatrix4(s);let r=new u.Vector3,a=new u.Vector3;i.distanceSqToSegment(_.start,_.end,a,r),n.push({point:a,pointOnLine:r,distance:i.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,[y]:null})}}}(this,s,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(g),this.material.uniforms.resolution.value.set(g.z,g.w))}}class O extends h{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class I extends B{constructor(e=new O,t=new v({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let P=o.forwardRef(function({points:e,color:t="black",vertexColors:n,linewidth:i,lineWidth:r,segments:a,dashed:l,...d},f){let p=(0,s.A)(e=>e.size),m=o.useMemo(()=>a?new B:new I,[a]),[y]=o.useState(()=>new v),g=o.useMemo(()=>{let t=a?new h:new O,i=e.map(e=>{let t=Array.isArray(e);return e instanceof u.Vector3?[e.x,e.y,e.z]:e instanceof u.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(t.setPositions(i.flat()),n){let e=n.map(e=>e instanceof u.Color?e.toArray():e);t.setColors(e.flat())}return t},[e,a,n]);return o.useLayoutEffect(()=>{m.computeLineDistances()},[e,m]),o.useLayoutEffect(()=>{l?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[l,y]),o.useEffect(()=>()=>g.dispose(),[g]),o.createElement("primitive",(0,c.Z)({object:m,ref:f},d),o.createElement("primitive",{object:g,attach:"geometry"}),o.createElement("primitive",(0,c.Z)({object:y,attach:"material",color:t,vertexColors:!!n,resolution:[p.width,p.height],linewidth:null!=i?i:r,dashed:l},d)))});var D=n(5476),R=n(5903);function T(e){let{count:t=500}=e,n=(0,o.useRef)(null),i=(0,o.useMemo)(()=>{let e=new Float32Array(3*t),n=new Float32Array(3*t);for(let i=0;i<t;i++){let t=Math.random()*Math.PI*2,r=Math.acos(2*Math.random()-1),a=2+3*Math.random();e[3*i]=a*Math.sin(r)*Math.cos(t),e[3*i+1]=a*Math.sin(r)*Math.sin(t),e[3*i+2]=a*Math.cos(r),n[3*i]=.07+.1*Math.random(),n[3*i+1]=.8+.2*Math.random(),n[3*i+2]=.7+.3*Math.random()}return{positions:e,colors:n}},[t]);return(0,s.C)(e=>{n.current&&(n.current.rotation.y=.05*e.clock.elapsedTime,n.current.rotation.x=.1*Math.sin(.1*e.clock.elapsedTime))}),(0,a.jsxs)("points",{ref:n,children:[(0,a.jsxs)("bufferGeometry",{children:[(0,a.jsx)("bufferAttribute",{attach:"attributes-position",count:i.positions.length/3,array:i.positions,itemSize:3}),(0,a.jsx)("bufferAttribute",{attach:"attributes-color",count:i.colors.length/3,array:i.colors,itemSize:3})]}),(0,a.jsx)("pointsMaterial",{size:.03,vertexColors:!0,transparent:!0,opacity:.8,sizeAttenuation:!0})]})}function V(){let e=(0,o.useRef)(null),t=(0,o.useRef)(null);return(0,s.C)(n=>{if(e.current&&(e.current.rotation.y=.3*n.clock.elapsedTime,e.current.rotation.x=.2*Math.sin(.2*n.clock.elapsedTime)),t.current){let e=1+.1*Math.sin(2*n.clock.elapsedTime);t.current.scale.setScalar(e)}}),(0,a.jsxs)("group",{children:[(0,a.jsx)(d,{ref:e,args:[.5,64,64],children:(0,a.jsx)("meshStandardMaterial",{color:"#12F6C8",emissive:"#12F6C8",emissiveIntensity:.5,metalness:.8,roughness:.2,wireframe:!0})}),(0,a.jsx)(d,{ref:t,args:[.7,32,32],children:(0,a.jsx)("meshBasicMaterial",{color:"#12F6C8",transparent:!0,opacity:.1})}),(0,a.jsx)(d,{args:[.2,32,32],children:(0,a.jsx)("meshStandardMaterial",{color:"#0B85E5",emissive:"#0B85E5",emissiveIntensity:1})})]})}function H(e){let{count:t=20}=e,n=(0,o.useRef)(null),i=(0,o.useMemo)(()=>Array.from({length:t},(e,n)=>{let i=[],r=n/t*Math.PI*2;for(let e=0;e<=20;e++){let t=e/20,n=.6+1.5*t,a=r+t*Math.PI*.5,o=(Math.random()-.5)*2*t;i.push(new u.Vector3(n*Math.cos(a),o,n*Math.sin(a)))}return i}),[t]);return(0,s.C)(e=>{n.current&&(n.current.rotation.y=.1*e.clock.elapsedTime)}),(0,a.jsx)("group",{ref:n,children:i.map((e,t)=>(0,a.jsx)(P,{points:e,color:"#12F6C8",lineWidth:1,transparent:!0,opacity:.4+.3*Math.random()},t))})}function F(e){let{count:t=8}=e,n=(0,o.useRef)(null);(0,s.C)(e=>{n.current&&n.current.children.forEach((t,n)=>{t.material&&(t.material.opacity=.3+.3*Math.sin(10*e.clock.elapsedTime+n))})});let i=(0,o.useMemo)(()=>Array.from({length:t},(e,n)=>{let i=[],r=n/t*Math.PI*2,a=r+.3*Math.PI;for(let e=0;e<=10;e++){let t=e/10,n=r+(a-r)*t,o=1.2+.3*Math.sin(t*Math.PI),s=(Math.random()-.5)*.1;i.push(new u.Vector3(o*Math.cos(n)+s,(Math.random()-.5)*.5,o*Math.sin(n)+s))}return i}),[t]);return(0,a.jsx)("group",{ref:n,children:i.map((e,t)=>(0,a.jsx)(P,{points:e,color:"#0B85E5",lineWidth:2,transparent:!0,opacity:.5},t))})}function N(e){let{count:t=12}=e,n=(0,o.useRef)(null),i=(0,o.useMemo)(()=>Array.from({length:t},(e,n)=>{let i=n/t*Math.PI*2,r=Math.acos(n/t*2-1);return{position:new u.Vector3(1.8*Math.sin(r)*Math.cos(i),1.8*Math.cos(r),1.8*Math.sin(r)*Math.sin(i)),scale:.05+.05*Math.random()}}),[t]);return(0,s.C)(e=>{n.current&&n.current.children.forEach((t,n)=>{let r=i[n].scale*(1+.3*Math.sin(3*e.clock.elapsedTime+n));t.scale.setScalar(r)})}),(0,a.jsx)("group",{ref:n,children:i.map((e,t)=>(0,a.jsx)(d,{args:[1,16,16],position:e.position,scale:e.scale,children:(0,a.jsx)("meshStandardMaterial",{color:"#12F6C8",emissive:"#12F6C8",emissiveIntensity:2})},t))})}function k(){return(0,a.jsx)(D.x,{position:[0,-2.5,0],fontSize:.15,color:"#12F6C8",anchorX:"center",anchorY:"middle",fillOpacity:.3,children:"We don't make technology — we make technology intelligent."})}function G(){let{mouse:e}=(0,s.A)(),t=(0,o.useRef)(null);return(0,s.C)(()=>{t.current&&(t.current.rotation.y+=(.5*e.x-t.current.rotation.y)*.05,t.current.rotation.x+=(.3*e.y-t.current.rotation.x)*.05)}),(0,a.jsxs)("group",{ref:t,children:[(0,a.jsx)(V,{}),(0,a.jsx)(H,{count:30}),(0,a.jsx)(T,{count:800}),(0,a.jsx)(F,{count:12}),(0,a.jsx)(N,{count:16}),(0,a.jsx)(k,{})]})}function W(){return(0,a.jsx)("div",{className:"w-full h-full min-h-[600px]",children:(0,a.jsxs)(l.Xz,{camera:{position:[0,0,5],fov:60},gl:{antialias:!0,alpha:!0},children:[(0,a.jsx)("color",{attach:"background",args:["#050505"]}),(0,a.jsx)("fog",{attach:"fog",args:["#050505",5,15]}),(0,a.jsx)("ambientLight",{intensity:.2}),(0,a.jsx)("pointLight",{position:[10,10,10],intensity:1,color:"#12F6C8"}),(0,a.jsx)("pointLight",{position:[-10,-10,-10],intensity:.5,color:"#0B85E5"}),(0,a.jsx)(G,{}),(0,a.jsx)(R.z,{enableZoom:!1,enablePan:!1,maxPolarAngle:Math.PI/1.5,minPolarAngle:Math.PI/3})]})})}}}]);