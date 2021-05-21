import React from 'react';

const ImpactSDGLines = (props) => {
	const arr = [ {} ];


	var i;
	for (i = 1; i < 18; i++) {

		const s = props.sdgs.find((x) => x.id === 'sdg-' + i)

		if (s){
			arr.push({
				sdg: i,
				position: s.position.toString()
			});		
		}else{
			arr.push({
				sdg: i,
				position: '1'
			});
		}
	}

	return (
		<div>
			{arr.map((line) => (
					<ImpactSDGLine sdg={line.sdg} position={line.position} keydata={line.sdg} />
			))}
		</div>
	);
};

const ImpactSDGLine = (props) => {
	const sdg = props.sdg;
	const beforeCSS = props.position > 2 ? 'before' + (props.position - 2).toString() : null
	const sdgcolorCSS = sdg === 1 ? 'sdgcolor' : 'sdg' + sdg + 'color';
	const sdgurl = '/assets/img/SDG' + sdg + '.png';

	return (
		<div className="rowstable" key={props.keydata}>
			<div className="harmrow">
				{props.position === '0' ? (
					<div className={beforeCSS + ' ' + sdgcolorCSS}>
						<img src={sdgurl} className="imgoncenter" alt="" />
					</div>
				) : null}
			</div>
			<div className="impactrow">
				{props.position === '1' ? (
					<div className={beforeCSS + ' ' + sdgcolorCSS}>
						<img src={sdgurl} className="imgoncenter" alt="" />
					</div>
				) : null}
			</div>
			<div className="first">
				{props.position === '2' ? (
					<div className={beforeCSS + ' ' + sdgcolorCSS}>
						<img src={sdgurl} className="imgoncenter" alt="" />
					</div>
				) : null}
			</div>
			<div className="nth2">
				{props.position === '3' ? (
					<div className={beforeCSS + ' ' + sdgcolorCSS}>
						<img src={sdgurl} className="imgoncenter" alt="" />
					</div>
				) : null}
			</div>
			<div className="nth3">
				{props.position === '4' ? (
					<div className={beforeCSS + ' ' + sdgcolorCSS}>
						<img src={sdgurl} className="imgoncenter" alt="" />
					</div>
				) : null}
			</div>

			<div className="forborder1" />
			<div className="forborder2" />
			<div className="forborder3" />
			<div className="forborder4" />
			<div className="forborder5" />
			<div className="forborder6" />
		</div>
	);
};

const ImpactSDG = (props) => {
	const sdgs = props.fund.impactsdg.scoring;
	const focusareas = props.fund.impactsdg.focusareas;

	return (
		<div className="tablestep8">
			<div className="ctable" style={{paddingBottom:"0px"}}>
				<div className="minwidthoftable">
					<div className="sections">
						<div className="harmrow">
							<div className="forborder" />
							<div className="tit">
								<p>NOT APPLICABLE</p>
							</div>
						</div>
						<div className="impactrow">
							<div className="forborder" />
							<div className="tit">
								<p>MAY CAUSE HARM</p>
							</div>
						</div>
						<div className="first">
							<p>ACT TO AVOID HARM</p>
						</div>
						<div className="nth2">
							<div className="tit">
								<p>BENEFIT STAKEHOLDERS</p>
							</div>
						</div>
						<div className="nth3">
							<div className="tit">
								<p>CONTRIBUTE TO SOLUTIONS</p>
							</div>
						</div>
					</div>

					<ImpactSDGLines sdgs={sdgs} />
				</div>
			</div>
		</div>
	);
};

export default ImpactSDG;
