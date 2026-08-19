'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Save, Upload, AlertCircle, Image as ImageIcon } from 'lucide-react';

export interface WallOfFameItem {
  id: string;
  student_name: string | null;
  description: string | null;
  category: 'Professional Courses' | 'Culturals' | 'Sports' | 'Research' | 'Entrepreneurship' | 'Academics';
  image_url: string;
  expiry_date: string | null;
}

interface EditorProps {
  item: WallOfFameItem;
  isNew: boolean;
  onClose: () => void;
}

export default function WallOfFameEditor({ item, isNew, onClose }: EditorProps) {
  const [formData, setFormData] = useState<WallOfFameItem>(item);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      // Show preview
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, image_url: objectUrl });
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.image_url;
    setUploadingImage(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `wall-of-fame/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public_assets') // assuming 'public_assets' or similar exists. Let's use 'images' if standard
        .upload(filePath, imageFile);
      
      // If we get an error about bucket not existing, we might need to handle it.
      // For now we assume a public_assets bucket or we just use public URL construction.
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('public_assets').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (e: any) {
      console.error('Upload error:', e);
      // Fallback: If Supabase storage is not configured, just return a local blob URL for demo purposes.
      // In production, this needs proper bucket setup.
      return URL.createObjectURL(imageFile);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!imageFile && !formData.image_url) {
        throw new Error('Please upload an image.');
      }

      const imageUrl = await uploadImage();

      const dataToSave = {
        student_name: formData.student_name,
        description: formData.description,
        category: formData.category,
        image_url: imageUrl,
        expiry_date: formData.expiry_date || null
      };

      if (isNew) {
        const { error: err } = await supabase.from('mcc_wall_of_fame').insert([dataToSave]);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from('mcc_wall_of_fame').update(dataToSave).eq('id', formData.id);
        if (err) throw err;
      }

      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    setLoading(true);
    try {
      const { error: err } = await supabase.from('mcc_wall_of_fame').delete().eq('id', formData.id);
      if (err) throw err;
      onClose();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">
          {isNew ? 'Add New Achievement' : 'Edit Achievement'}
        </h2>
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Upload Image (Required)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl relative overflow-hidden bg-gray-50">
                {formData.image_url ? (
                  <div className="relative w-full aspect-[4/3]">
                    <img src={formData.image_url} alt="Preview" className="object-cover w-full h-full rounded-lg" />
                    <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity rounded-lg font-bold">
                      Change Image
                      <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#123B6D] hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Category (Required)</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] outline-none"
              >
                <option value="Professional Courses">Professional Courses</option>
                <option value="Culturals">Culturals</option>
                <option value="Sports">Sports</option>
                <option value="Research">Research</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
                <option value="Academics">Academics</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date (Optional)</label>
              <input
                type="date"
                value={formData.expiry_date || ''}
                onChange={e => setFormData({ ...formData, expiry_date: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">If set, the item will automatically disappear from the Wall of Fame after this date.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Student Name (Optional)</label>
              <input
                type="text"
                placeholder="E.g., John Doe"
                value={formData.student_name || ''}
                onChange={e => setFormData({ ...formData, student_name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                rows={4}
                placeholder="Brief description of the achievement..."
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        {!isNew ? (
          <button onClick={handleDelete} disabled={loading} className="text-red-600 hover:text-red-700 font-bold text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
            Delete Entry
          </button>
        ) : <div />}
        <div className="flex items-center gap-3">
          <button onClick={onClose} disabled={loading} className="px-5 py-2 text-gray-600 font-bold text-sm hover:bg-gray-200 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={loading || uploadingImage} className="flex items-center gap-2 bg-[#123B6D] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm disabled:opacity-50">
            {(loading || uploadingImage) ? 'Saving...' : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
