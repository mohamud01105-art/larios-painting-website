import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  Info,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { GalleryItem } from '../types.ts';

const realProjects: GalleryItem[] = [
  {
    id: 'proj-two-story-front',
    title: 'Two-Story Siding, Accent Trim & Garage Transformation',
    category: 'before-after',
    location: 'Omaha, NE',
    description:
      'Full exterior transformation from weathered tan siding to modern crisp cream siding, featuring a bold deep navy blue garage door, matching window casings, painted masonry foundation, and clean white porch railings.',
    image: '/projects/0de5b990-26f5-4c16-b11a-4d9396ebaa84.jpeg',
    isBeforeAfter: true,
    beforeImage: '/projects/a53d13f6-e74e-4810-b1f6-e990b92fcb84.jpeg',
    afterImage: '/projects/0de5b990-26f5-4c16-b11a-4d9396ebaa84.jpeg',
    beforeDetails: 'Faded tan siding, plain garage door, exposed red brick base, and unpainted wooden railing.',
    afterDetails: 'Fresh modern cream siding, deep navy garage and door, sharp dark window trim, and painted white railing.',
  },
  {
    id: 'proj-two-story-side',
    title: 'Architectural Gable Elevation & Foundation Coating',
    category: 'before-after',
    location: 'Omaha, NE',
    description:
      'Side perspective showcasing uniform paint coverage on multi-story horizontal lap siding, clean window frame cut-ins, painted brick masonry, and coated basement block foundation.',
    image: '/projects/52cba5c1-d78b-40e2-aaca-0591643594d0.jpeg',
    isBeforeAfter: true,
    beforeImage: '/projects/35cb81b6-ebf4-4841-a748-ea0815307559.jpeg',
    afterImage: '/projects/52cba5c1-d78b-40e2-aaca-0591643594d0.jpeg',
    beforeDetails: 'Discolored siding, raw wooden porch rail, and unpainted foundation bricks.',
    afterDetails: 'Flawless satin finish, painted white architectural porch railing, and uniform coated masonry base.',
  },
  {
    id: 'proj-two-story-backyard',
    title: 'Backyard Elevation & Deck Trim Enhancement',
    category: 'before-after',
    location: 'Omaha, NE',
    description:
      'Rear exterior showing complete siding repaint, bay window accent framing, dark trim borders, and clean weather-sealed finish above the walk-out deck.',
    image: '/projects/669e6fe2-65f8-44a3-b86f-0e31454c5ebe.jpeg',
    isBeforeAfter: true,
    beforeImage: '/projects/f4b40a8e-9a3e-497b-8b09-50888cd78e26.jpeg',
    afterImage: '/projects/669e6fe2-65f8-44a3-b86f-0e31454c5ebe.jpeg',
    beforeDetails: 'Weather-beaten siding with ladder setup for preparation and cleaning.',
    afterDetails: 'Completed uniform paint coat with striking dark contrast on window casings and bay window.',
  },
  {
    id: 'proj-ranch-split-prep',
    title: 'Split-Level Siding Preparation & Finished Repaint',
    category: 'before-after',
    location: 'Lincoln, NE',
    description:
      'Demonstrating our thorough surface prep: scraping peeling spots, caulking seams, masking the garage and brick, followed by applying durable cream body paint with rich burgundy fascia and trim accents.',
    image: '/projects/19b9bb3c-0b71-42ff-9a4c-c6dbccf8c7c7.jpeg',
    isBeforeAfter: true,
    beforeImage: '/projects/fb893f4a-a14e-42ba-b832-c8508942eb57.jpeg',
    afterImage: '/projects/19b9bb3c-0b71-42ff-9a4c-c6dbccf8c7c7.jpeg',
    beforeDetails: 'Full surface prep with scraping, patching of siding defects, and plastic protective masking.',
    afterDetails: 'Smooth, durable fresh coat with rich burgundy window casings and roofline accents.',
  },
  {
    id: 'proj-crew-in-action',
    title: 'Exterior Spray & Masking Craftsmanship in Action',
    category: 'prep',
    location: 'Council Bluffs, IA',
    description:
      'Larios Painting crew on site utilizing professional airless spray equipment, drop cloths, and full masking on windows and entryways to ensure clean lines and zero overspray.',
    image: '/projects/1f7c283a-43bb-4ed8-b387-c6e69c1f90d9.jpeg',
    isBeforeAfter: false,
  },
  {
    id: 'proj-color-change-prep',
    title: 'Pre-Paint Preparation & Shutter Detachment',
    category: 'prep',
    location: 'Council Bluffs, IA',
    description:
      'Careful detachment of exterior shutters and comprehensive preparation before transforming dark siding to modern light tones.',
    image: '/projects/e1e25ff9-19da-4dcd-9cb8-41f5239f6b3e.jpeg',
    isBeforeAfter: false,
  },
  {
    id: 'proj-split-completed',
    title: 'Completed Split-Level Exterior Refresh',
    category: 'exterior',
    location: 'Lincoln, NE',
    description:
      'Finished exterior featuring clean, even coverage across the upper siding, painted trim, and preserved natural brick accents below.',
    image: '/projects/19b9bb3c-0b71-42ff-9a4c-c6dbccf8c7c7.jpeg',
    isBeforeAfter: false,
  },
  {
    id: 'proj-front-curb-appeal',
    title: 'High-Contrast Navy & Cream Suburban Curb Appeal',
    category: 'residential',
    location: 'Omaha, NE',
    description:
      'Completed full residential exterior repaint emphasizing crisp contrast between deep navy garage door, front entryway, and light-toned siding.',
    image: '/projects/0de5b990-26f5-4c16-b11a-4d9396ebaa84.jpeg',
    isBeforeAfter: false,
  },
];

export const ProjectGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(realProjects);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxView, setLightboxView] = useState<'after' | 'before'>('after');
  const [cardToggleState, setCardToggleState] = useState<Record<string, 'after' | 'before'>>({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('Omaha, NE');
  const [newCategory, setNewCategory] = useState<'exterior' | 'residential' | 'before-after' | 'prep'>('exterior');
  const [newImageFile, setNewImageFile] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects (10)' },
    { id: 'before-after', label: 'Before & After Pairs' },
    { id: 'exterior', label: 'Exterior Siding & Trim' },
    { id: 'residential', label: 'Residential Homes' },
    { id: 'prep', label: 'Surface Prep & Crew' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : activeCategory === 'before-after'
      ? galleryItems.filter((item) => item.isBeforeAfter)
      : galleryItems.filter((item) => item.category === activeCategory || (activeCategory === 'exterior' && item.isBeforeAfter));

  // Handle card before/after view toggle
  const toggleCardView = (id: string, view: 'after' | 'before', e: React.MouseEvent) => {
    e.stopPropagation();
    setCardToggleState((prev) => ({ ...prev, [id]: view }));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
        setLightboxView('after');
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
        setLightboxView('after');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setNewImageFile(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUploadedPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageFile || !newTitle.trim()) return;

    const newItem: GalleryItem = {
      id: `custom-proj-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      location: newLocation.trim() || 'Omaha Metro',
      description: 'Jobsite photograph documenting preparation and professional paint craftsmanship.',
      image: newImageFile,
    };

    setGalleryItems([newItem, ...galleryItems]);
    setShowUploadModal(false);
    setNewTitle('');
    setNewImageFile(null);
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="our-work" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A50918] mb-3">
              <span>Real Workmanship Gallery</span>
              <span aria-hidden="true">·</span>
              <span>Genuine Jobsite Photos</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              Our Completed Work & Before &amp; After Transformations
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Browse actual project photographs from Larios Painting job sites across Nebraska and Iowa. Toggle the interactive Before &amp; After comparisons to see our detailed surface prep and crisp paint finishes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4 text-neutral-600" />
              <span>Add Jobsite Photo</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const currentCardView = cardToggleState[item.id] || 'after';
            const displayImage =
              item.isBeforeAfter && currentCardView === 'before'
                ? item.beforeImage!
                : item.image;

            return (
              <div
                key={item.id}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxView(currentCardView);
                }}
                className="group flex flex-col bg-neutral-50 rounded-2xl overflow-hidden cursor-pointer border border-neutral-200 shadow-2xs hover:shadow-lg transition-all duration-200"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-200">
                  <img
                    src={displayImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 pointer-events-none"></div>

                  {/* Top Badges / Toggle Controls for Before-and-After */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      {item.location}
                    </span>

                    {item.isBeforeAfter ? (
                      <div
                        className="bg-black/70 backdrop-blur-xs p-1 rounded-lg flex items-center gap-1 border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={(e) => toggleCardView(item.id, 'before', e)}
                          className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded transition-colors ${
                            currentCardView === 'before'
                              ? 'bg-[#A50918] text-white shadow-xs'
                              : 'text-neutral-300 hover:text-white'
                          }`}
                        >
                          Before
                        </button>
                        <button
                          type="button"
                          onClick={(e) => toggleCardView(item.id, 'after', e)}
                          className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded transition-colors ${
                            currentCardView === 'after'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-neutral-300 hover:text-white'
                          }`}
                        >
                          After
                        </button>
                      </div>
                    ) : (
                      <div className="p-1.5 bg-black/50 text-white rounded-md backdrop-blur-xs">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Image Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold drop-shadow-xs pointer-events-none">
                    <span className="capitalize">
                      {item.isBeforeAfter
                        ? currentCardView === 'before'
                          ? 'State Before Painting'
                          : 'Completed Painting Finish'
                        : item.category === 'prep'
                        ? 'Active Surface Preparation'
                        : 'Exterior Painting'}
                    </span>
                    <span className="text-[11px] text-neutral-200">Click to enlarge</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 bg-white">
                  <h3 className="font-display text-base font-bold text-neutral-900 group-hover:text-[#A50918] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  {/* Before / After Notes if applicable */}
                  {item.isBeforeAfter && (
                    <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-600 space-y-1">
                      <div className="flex items-start gap-1.5">
                        <strong className="text-neutral-900 shrink-0">
                          {currentCardView === 'before' ? 'Before:' : 'Finished:'}
                        </strong>
                        <span className="line-clamp-2">
                          {currentCardView === 'before' ? item.beforeDetails : item.afterDetails}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Authenticity Transparency Banner */}
        <div className="mt-14 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-start gap-3.5 text-xs text-neutral-600">
          <Info className="w-5 h-5 text-[#A50918] shrink-0 mt-0.5" />
          <div>
            <strong className="text-neutral-900 block font-bold mb-0.5">
              Genuine Jobsite Photography Only:
            </strong>
            The images shown above document real residential and exterior painting projects performed by Larios Painting. We do not use digital altering or stock illustrations to misrepresent finished work. Every home shown features genuine scraping, priming, masking, and weather-tested coatings.
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Before/After Toggle */}
      {lightboxIndex !== null && currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-20 p-2.5 text-white hover:text-neutral-300 bg-white/10 rounded-full focus:outline-none"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Right Nav */}
          {filteredItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : filteredItems.length - 1);
                  setLightboxView('after');
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex < filteredItems.length - 1 ? lightboxIndex + 1 : 0);
                  setLightboxView('after');
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Modal Card */}
          <div
            className="max-w-5xl w-full max-h-[92vh] bg-[#111111] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enlarged Photo */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[60vh] md:max-h-[88vh]">
              <img
                src={
                  currentItem.isBeforeAfter && lightboxView === 'before'
                    ? currentItem.beforeImage!
                    : currentItem.isBeforeAfter
                    ? currentItem.afterImage!
                    : currentItem.image
                }
                alt={currentItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* In-Lightbox Before/After Switch Bar */}
              {currentItem.isBeforeAfter && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLightboxView('before')}
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${
                      lightboxView === 'before'
                        ? 'bg-[#A50918] text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    View Before
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxView('after')}
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${
                      lightboxView === 'after'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    View After
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Details */}
            <div className="w-full md:w-88 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-800 text-white bg-neutral-900">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#E53E3E] uppercase tracking-wider mb-2">
                  <span>{currentItem.category.replace('-', ' ')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentItem.location}</span>
                </div>

                <h3 className="font-display text-xl font-bold mb-3 leading-snug">
                  {currentItem.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  {currentItem.description}
                </p>

                {currentItem.isBeforeAfter && (
                  <div className="space-y-3 p-3.5 bg-black/40 rounded-xl border border-neutral-800 text-xs mb-6">
                    <div>
                      <span className="font-bold text-[#E53E3E] block mb-0.5">Original Condition:</span>
                      <span className="text-neutral-300">{currentItem.beforeDetails}</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800">
                      <span className="font-bold text-emerald-400 block mb-0.5">Finished Transformation:</span>
                      <span className="text-neutral-300">{currentItem.afterDetails}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <div className="text-xs text-neutral-400 mb-3 flex items-center justify-between">
                  <span>Photo {lightboxIndex + 1} of {filteredItems.length}</span>
                  <span className="text-neutral-500">Genuine Contractor Work</span>
                </div>
                <a
                  href="#free-estimate"
                  onClick={() => setLightboxIndex(null)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#A50918] hover:bg-[#870612] rounded-xl transition-colors text-center"
                >
                  <span>Request an Estimate for Your Home</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Jobsite Photo Modal */}
      {showUploadModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-neutral-900">
                Add Verified Project Photo
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 mb-4">
              Add genuine house photographs taken on job sites in Omaha, Lincoln, Council Bluffs, or surrounding communities.
            </p>

            <form onSubmit={handleSaveUploadedPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siding Repaint & Deep Navy Trim"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:outline-none bg-white"
                  >
                    <option value="exterior">Exterior Painting</option>
                    <option value="residential">Residential Projects</option>
                    <option value="before-after">Before & After</option>
                    <option value="prep">Surface Prep & Crew</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Omaha, NE"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Select Photo File *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handlePhotoUpload}
                  className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                />
              </div>

              {newImageFile && (
                <div className="mt-2 aspect-video w-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                  <img src={newImageFile} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newImageFile || !newTitle.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#A50918] hover:bg-[#870612] disabled:opacity-50 rounded-lg transition-colors"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
