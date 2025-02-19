import { Link } from 'react-router-dom';
import './Navbar.css';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import logoHeader from '../../assets/logoSuaVozHeader.png';

const Navbar = () => {
	const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

	function animation() {
		var tabsNewAnim = $('#navbarSupportedContent');
		var activeItemNewAnim = tabsNewAnim.find('.active');
		var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
		var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
		var itemPosNewAnimTop = activeItemNewAnim.position();
		var itemPosNewAnimLeft = activeItemNewAnim.position();
		$('.hori-selector').css({
			top: itemPosNewAnimTop.top + 'px',
			left: itemPosNewAnimLeft.left + 'px',
			height: activeWidthNewAnimHeight + 'px',
			width: activeWidthNewAnimWidth + 'px',
		});
		$('#navbarSupportedContent').on('click', 'li', function (e) {
			$('#navbarSupportedContent ul li').removeClass('active');
			$(this).addClass('active');
			var activeWidthNewAnimHeight = $(this).innerHeight();
			var activeWidthNewAnimWidth = $(this).innerWidth();
			var itemPosNewAnimTop = $(this).position();
			var itemPosNewAnimLeft = $(this).position();
			$('.hori-selector').css({
				top: itemPosNewAnimTop.top + 'px',
				left: itemPosNewAnimLeft.left + 'px',
				height: activeWidthNewAnimHeight + 'px',
				width: activeWidthNewAnimWidth + 'px',
			});
		});
	}

	useEffect(() => {
		animation();
		$(window).on('resize', function () {
			setTimeout(function () {
				animation();
			}, 500);
		});
	}, []);

	return (
		<nav className='navbar navbar-expand-xl navbar-mainbg fixed-top navbar__container '>
			<li className='nav-item active'>
				<Link className='navbar-brand navbar-logo' to='/'>
					<img src={logoHeader} alt='logo sua voz pessoa  com altafalante' />
				</Link>
			</li>

			<button
				className='navbar-toggler'
				onClick={function () {
					setTimeout(function () {
						animation();
					});
				}}
				type='button'
				data-toggle='collapse'
				data-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<i className='fas fa-bars text-white'></i>
			</button>

			<div className='collapse navbar-collapse' id='navbarSupportedContent'>
				{/* <div className='mx-auto'></div> */}

				<ul className='navbar-nav ml-auto'>
					<div className='hori-selector'>
						<div className='left'></div>
						<div className='right'></div>
					</div>

					<li className='nav-item active'>
						<Link className='nav-link' to='/'>
							<i class='fas fa-home'></i>Home
						</Link>
					</li>

					<li className='nav-item'>
						<Link className='nav-link' to='/sobre'>
							<i className=' fa-solid fa-handshake'></i>Sobre nós
						</Link>
					</li>

					<li className='nav-item'>
						<Link className='nav-link' to='/direitos'>
							<i className='fas fa-hands-helping  '></i>Seus direitos
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/feed/denuncia'>
							<i className='fas fa-edit'></i>Denuncias
						</Link>
					</li>

					{!isAuthenticated ? (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/perfil'
								onClick={() => loginWithRedirect()}
							>
								<i className='fa-solid fa-right-to-bracket'></i>Entrar
							</Link>
						</li>
					) : (
						<>
							<li className='nav-item'>
								<Link className='nav-link' to='/perfil'>
									<i class='fa-solid fa-user-check'></i> {user?.email}
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/' onClick={() => logout()}>
									<i className='fa-solid fa-right-from-bracket'></i>Sair
									fa-right-from-bracket
									{/* fa-circle-arrow-right */}
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};
export default Navbar;
