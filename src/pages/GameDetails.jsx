import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import gamesData from '../data/InfoGames';
import useIsMobile from '../hooks/useIsMobile';
import { motion } from 'framer-motion';

const GameDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const isMobile = useIsMobile();

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Busca o jogo pelo ID
    const game = gamesData.find(g => g.id === id);

    if (!game) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="text-2xl mb-4">Jogo não encontrado</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
                    >
                        Voltar ao Início
                    </button>
                </div>
            </div>
        );
    }

    const handleExternalAppClick = () => {
        if (game.externalApp && typeof game.externalApp.url === 'object') {
            const url = isMobile ? game.externalApp.url.mobile : game.externalApp.url.desktop;
            const message = isMobile
                ? "Você será redirecionado para a Play Store para baixar o uTorrent para celular."
                : "Você será redirecionado para o site do uTorrent para baixar a versão para desktop.";
            setModalMessage(message);
            setShowModal(true);
            window.open(url, '_blank');
        } else if (game.externalApp) {
            window.open(game.externalApp.url, '_blank');
        }
    };

    const handleGenreClick = (genreName) => {
        navigate(`/all-games?genre=${encodeURIComponent(genreName)}`);
    };


    const isVideo = currentImageIndex === "video";

    const nextImage = () => {
        if (!game.gallery || game.gallery.length === 0) return;
        setCurrentImageIndex(prev => {
            if (prev === "video") return 0;
            if (prev === game.gallery.length - 1) return game.youtubeId ? "video" : 0;
            return prev + 1;
        });
    };

    const prevImage = () => {
        if (!game.gallery || game.gallery.length === 0) return;
        setCurrentImageIndex(prev => {
            if (prev === 0) return game.youtubeId ? "video" : game.gallery.length - 1;
            if (prev === "video") return game.gallery.length - 1;
            return prev - 1;
        });
    };

    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Side */}
                    <div className="lg:flex-1 order-1 lg:order-none mb-8 lg:mb-0">
                        {/* Main Image / Video */}
                        <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6 aspect-video">
                            {isVideo && game.youtubeId ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${game.youtubeId}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img
                                    src={game.gallery?.[currentImageIndex] || game.cover}
                                    alt={game.title}
                                    className="w-full h-full object-cover object-center"
                                />
                            )}

                            {/* Navigation Arrows */}
                            {(game.gallery?.length > 0 || game.youtubeId) && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full transition-opacity"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full transition-opacity"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="flex overflow-x-auto space-x-3 mb-8">
                            {game.gallery?.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`relative w-20 h-14 flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${index === currentImageIndex ? 'border-cyan-400' : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${game.title} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}

                            {game.youtubeId && (
                                <button
                                    onClick={() => setCurrentImageIndex("video")}
                                    className={`relative w-20 h-14 flex-shrink-0 bg-black rounded border-2 flex items-center justify-center transition-colors ${currentImageIndex === "video" ? 'border-cyan-400' : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-black opacity-50"></div>
                                    <img
                                        src={`https://img.youtube.com/vi/${game.youtubeId}/0.jpg`}
                                        alt="YouTube video thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                    <Play className="absolute w-6 h-6 text-white" />
                                </button>
                            )}
                        </div>

                        {/* Sobre (desktop) */}
                        <div className="hidden lg:block">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {game.genre?.map((genre) => (
                                    <button key={genre} onClick={() => handleGenreClick(genre)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer">{genre}</button>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Sobre Este Jogo</h2>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {game.sobre || "Descrição não disponível."}
                            </p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full lg:w-80 order-2 lg:order-none">
                        <h1 className="text-3xl font-bold mb-3">{game.title}</h1>

                        {/* Info */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-6">
                            <div className="flex flex-col">
                                <span className="text-gray-400 uppercase tracking-wide text-xs">Plataforma</span>
                                <span className="font-medium">{game.platform || "N/A"}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400 uppercase tracking-wide text-xs">Tamanho</span>
                                <span className="font-medium">{game.size || "N/A"}</span>
                            </div>
                        </div>

                        {/* App Externo */}
                        {game.externalApp && (
                            <div className="relative bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-l-4 border-amber-500 rounded-lg p-4 mb-4 backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-amber-100 text-sm leading-relaxed">
                                            É necessário o app{' '}
                                            <button
                                                onClick={handleExternalAppClick}
                                                className="font-semibold text-amber-300 underline decoration-amber-400/50 underline-offset-2 hover:text-amber-200 hover:decoration-amber-300 transition-colors cursor-pointer"
                                            >
                                                {game.externalApp.name}
                                            </button>{' '}
                                            para instalar este jogo.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Download */}
                        {game.downloadLink && (
                            <button
                                onClick={() => window.open(game.downloadLink, '_blank')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mb-2 font-semibold"
                            >
                                Baixar
                            </button>
                        )}

                        {/* Emuladores */}
                        {game.EmuladorPC && (
                            <button
                                onClick={() => window.open(game.EmuladorPC, '_blank')}
                                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded text-sm mb-2"
                            >
                                Emulador Para PC
                            </button>
                        )}
                        {game.EmuladorMobile && (
                            <button
                                onClick={() => window.open(game.EmuladorMobile, '_blank')}
                                className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2.5 rounded text-sm mb-2"
                            >
                                Emulador Para Celular
                            </button>
                        )}

                        {/* Bios */}
                        {game.Bios && (
                            <button
                                onClick={() => window.open(game.Bios, '_blank')}
                                className="w-full bg-gray-500 hover:bg-gray-400 text-white py-2.5 rounded text-sm mb-4"
                            >
                                BIOS do Emulador
                            </button>
                        )}


                        {/* Senha */}
                        {game.senha && (
                            <div className="relative mb-4">
                                <div
                                    onClick={() => copyToClipboard(game.senha)}
                                    className="bg-gray-700 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 text-xs">Senha:</span>
                                        <span className="text-white font-mono text-sm font-semibold">{game.senha}</span>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>

                                {copied && (
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow-lg animate-fade-in">
                                        Copiado! ✓
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Subtitle */}
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {game.subtitle || ""}
                        </p>
                    </div>
                </div>

                {/* Sobre (mobile) */}
                <div className="lg:hidden mt-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {game.genre?.map((genre) => (
                            <button key={genre} onClick={() => handleGenreClick(genre)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">{genre}</button>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Sobre Este Jogo</h2>
                    <p className="text-gray-300 leading-relaxed text-sm">
                        {game.sobre || "Descrição não disponível."}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <p className="mb-4">{modalMessage}</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default GameDetails;
