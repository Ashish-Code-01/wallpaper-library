import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FaUpload, FaImage, FaTimes, FaCheck } from 'react-icons/fa';
import { useAuthHeader } from '../components/AuthComponents';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const UploadSection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background-color: white;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.1);
  }
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 50px;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.1);
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(108, 99, 255, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  font-size: 0.9rem;
  
  svg {
    margin-left: 0.5rem;
    cursor: pointer;
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const TagInput = styled.input`
  flex: 1;
  min-width: 100px;
  border: none;
  padding: 0.3rem;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
  }
`;

const DropZone = styled.div`
  border: 2px dashed ${({ isDragActive, hasFile, theme }) => 
    isDragActive 
      ? theme.colors.primary 
      : hasFile 
        ? theme.colors.success 
        : '#ddd'};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast},
              background-color ${({ theme }) => theme.transitions.fast};
  background-color: ${({ isDragActive, theme }) => 
    isDragActive ? 'rgba(108, 99, 255, 0.05)' : 'transparent'};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(108, 99, 255, 0.05);
  }
`;

const DropZoneIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ hasFile, theme }) => 
    hasFile ? theme.colors.success : theme.colors.lightText};
`;

const DropZoneText = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: 0.5rem;
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  position: relative;
  max-width: 300px;
  margin: 1rem auto 0;
`;

const PreviewImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: #ff3333;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: 0.8rem;
  }
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background-color: rgba(76, 175, 80, 0.1);
  color: ${({ theme }) => theme.colors.success};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const BaseURL ="https://wallpaper-library.onrender.com"

function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    resolution: '',
    tags: []
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const { getAuthHeader } = useAuthHeader();
  
  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BaseURL}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);
  
  useEffect(() => {
    // Create preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
    
    // Cleanup preview URL when component unmounts
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()]
        }));
      }
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        
        // Try to extract resolution from image
        extractResolution(droppedFile);
      }
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        
        // Try to extract resolution from image
        extractResolution(selectedFile);
      }
    }
  };
  
  const validateFile = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, or WebP)');
      return false;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const extractResolution = (file) => {
    const img = new Image();
    img.onload = () => {
      const resolution = `${img.width} x ${img.height}`;
      setFormData(prev => ({ ...prev, resolution }));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  };
  
  const removeFile = () => {
    setFile(null);
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    if (!formData.category) {
      setError('Please select a category');
      return;
    }
    
    if (!formData.resolution) {
      setError('Please enter the resolution');
      return;
    }
    
    if (!file) {
      setError('Please select an image');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Get auth headers
      const authHeaders = await getAuthHeader();
      
      // Create form data for file upload
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('category', formData.category);
      uploadData.append('resolution', formData.resolution);
      uploadData.append('tags', formData.tags.join(','));
      uploadData.append('image', file);
      
      // Upload wallpaper with authentication headers
      const response = await axios.post(`${BaseURL}/api/wallpapers`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...authHeaders
        }
      });
      
      setSuccess(true);
      setLoading(false);
      
      // Reset form after successful upload
      setFormData({
        title: '',
        description: '',
        category: '',
        resolution: '',
        tags: []
      });
      setFile(null);
      setPreview('');
      
      // Redirect to the uploaded wallpaper after a short delay
      setTimeout(() => {
        navigate(`/wallpaper/${response.data._id}`);
      }, 2000);
      
    } catch (err) {
      console.error('Error uploading wallpaper:', err);
      setError(err.response?.data?.message || 'Failed to upload wallpaper. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <UploadContainer>
      <PageTitle>Upload Wallpaper</PageTitle>
      
      {success && (
        <SuccessMessage>
          <FaCheck /> Wallpaper uploaded successfully! Redirecting...
        </SuccessMessage>
      )}
      
      <UploadSection>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title *</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a title for your wallpaper"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your wallpaper (optional)"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Category *</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="resolution">Resolution *</Label>
            <Input
              type="text"
              id="resolution"
              name="resolution"
              value={formData.resolution}
              onChange={handleInputChange}
              placeholder="e.g. 1920 x 1080"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Tags</Label>
            <TagsInput>
              {formData.tags.map(tag => (
                <Tag key={tag}>
                  {tag}
                  <FaTimes onClick={() => removeTag(tag)} />
                </Tag>
              ))}
              <TagInput
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={formData.tags.length === 0 ? "Type tags and press Enter" : ""}
              />
            </TagsInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Upload Image *</Label>
            <DropZone
              onClick={() => fileInputRef.current.click()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragActive={isDragActive}
              hasFile={!!file}
            >
              <DropZoneIcon hasFile={!!file}>
                {file ? <FaCheck /> : <FaImage />}
              </DropZoneIcon>
              <DropZoneText>
                {file
                  ? 'Image selected'
                  : isDragActive
                  ? 'Drop the image here'
                  : 'Drag & drop an image here, or click to select'}
              </DropZoneText>
              <DropZoneText>
                Supported formats: JPEG, PNG, WebP (Max: 10MB)
              </DropZoneText>
              <FileInput
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
              />
            </DropZone>
            
            {preview && (
              <ImagePreview>
                <PreviewImage src={preview} alt="Preview" />
                <RemoveButton onClick={removeFile}>
                  <FaTimes />
                </RemoveButton>
              </ImagePreview>
            )}
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton type="submit" disabled={loading}>
            <FaUpload /> {loading ? 'Uploading...' : 'Upload Wallpaper'}
          </SubmitButton>
        </form>
      </UploadSection>
    </UploadContainer>
  );
}

export default Upload; 