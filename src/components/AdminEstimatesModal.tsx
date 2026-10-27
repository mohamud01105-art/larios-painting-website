import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Mail, Phone, MapPin, Calendar, Image as ImageIcon, ShieldCheck, Check } from 'lucide-react';

interface AdminEstimatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminEstimatesModal: React.FC<AdminEstimatesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [estimates, setEstimates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  const fetchEstimates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/estimates');
      const data = await res.json();
      if (data.success) {
        setEstimates(data.estimates || []);
      } else {
        throw new Error(data.error || 'Failed to fetch estimates');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error connecting to estimates backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEstimates();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-2 py-1 rounded-lg">
                <img
                  src="/assets/aistudio/dce0e853-e90a-4de6-b042-801169623cad_076f6ff2.jpeg"
                  alt="Larios Painting"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#A50918] text-white font-bold tracking-wide">
                Owner Dashboard
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Active quote inquiries recorded by the backend & dispatched to Austin@lariospaintingco.com
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchEstimates}
              disabled={loading}
              className="p-2 text-neutral-300 hover:text-white bg-white/10 rounded-lg transition-colors"
              title="Refresh submissions"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-neutral-300 hover:text-white bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="p-4 mb-4 bg-red-50 text-red-800 rounded-lg text-xs">
              {error}
            </div>
          )}

          {estimates.length === 0 && !loading ? (
            <div className="text-center py-12 text-neutral-500">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-display text-base font-bold text-neutral-700 mb-1">
                No Estimate Submissions Recorded Yet
              </h4>
              <p className="text-xs max-w-sm mx-auto">
                When homeowners or businesses fill out the &ldquo;Free Estimate&rdquo; form, their contact info, surface details, and attached photos will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-neutral-500 font-semibold mb-2 flex items-center justify-between">
                <span>{estimates.length} Total Submissions</span>
                <span className="text-emerald-700 font-normal flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Anti-Spam Filter Active
                </span>
              </div>

              {estimates.map((est) => (
                <div
                  key={est.id || est.referenceNumber}
                  className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 hover:border-neutral-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-neutral-200">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#A50918] bg-red-50 px-2 py-0.5 rounded mr-2">
                        {est.referenceNumber}
                      </span>
                      <strong className="text-sm text-neutral-900">{est.fullName}</strong>
                      <span className="text-xs text-neutral-500 ml-2">
                        ({new Date(est.submittedAt).toLocaleDateString()} at{' '}
                        {new Date(est.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-200 text-neutral-800 uppercase">
                        {est.propertyType}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {est.serviceNeeded}
                      </span>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                    <div>
                      <span className="text-neutral-500 block">Phone:</span>
                      <a href={`tel:${est.phone}`} className="font-semibold text-neutral-900 hover:underline">
                        {est.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Email:</span>
                      <a href={`mailto:${est.email}`} className="font-semibold text-neutral-900 hover:underline truncate block">
                        {est.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">ZIP Code:</span>
                      <span className="font-mono font-semibold text-neutral-900">{est.zipCode}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Scope:</span>
                      <span className="capitalize font-semibold text-neutral-900">{est.interiorOrExterior}</span>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-600 bg-white p-3 rounded-lg border border-neutral-200 mb-3">
                    <span className="font-semibold text-neutral-800">Project Details: </span>
                    {est.projectDetails || <span className="italic text-neutral-400">No additional details provided.</span>}
                  </div>

                  {/* Attached Photos */}
                  {est.photos && est.photos.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-semibold text-neutral-700 mb-2 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#A50918]" />
                        <span>Attached Photos ({est.photos.length})</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {est.photos.map((p: any, i: number) => (
                          <div
                            key={i}
                            onClick={() => p.dataUrl && setActivePhotoModal(p.dataUrl)}
                            className="cursor-pointer border border-neutral-300 rounded-lg overflow-hidden w-16 h-16 bg-neutral-200 hover:opacity-80 transition-opacity"
                          >
                            {p.dataUrl ? (
                              <img src={p.dataUrl} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-500 p-1 text-center">
                                {p.name}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <span>Backend Target: Austin@lariospaintingco.com</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800"
          >
            Close
          </button>
        </div>
      </div>

      {/* Enlarged photo overlay */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActivePhotoModal(null)}
        >
          <div className="max-w-3xl max-h-[90vh]">
            <img src={activePhotoModal} alt="Enlarged attachment" className="max-h-[85vh] max-w-full object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};
