import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Createspace = () => {
  const [formData, setFormData] = useState({
    name: "",
    Description: "",
    Price: "",
    zip_code: "",
    location: "",
    size: "",
    hasOutdoorSpace: false,
    cateringIncluded: false,
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: reader.result,
        }));
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await fetch(
          "http://localhost:5000/api/test/rentalSpace",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          // Form submission successful
          console.log("Form submitted successfully");
          setFormData({
            name: "",
            Description: "",
            Price: "",
            zip_code: "",
            location: "",
            size: "",
            hasOutdoorSpace: false,
            cateringIncluded: false,
            image: "",
          });
          setSelectedImage(null);
          setErrors({});
        } else {
          // Form submission failed
          console.log("Form submission failed");
          const errorData = await response.json();
          // Handle error response or display error message to the user
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle network errors or display error message to the user
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required.";
    }
    if (!formData.Description) {
      errors.Description = "Description is required.";
    }
    if (!formData.Price) {
      errors.Price = "Price is required.";
    }
    if (!formData.zip_code) {
      errors.zip_code = "ZIP Code is required.";
    }
    if (!formData.location) {
      errors.location = "Location is required.";
    }
    if (!formData.size) {
      errors.size = "Size is required.";
    }

    return errors;
  };

  return (
    <div className="container">
      <h2>Create Rental Space</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            isInvalid={!!errors.Description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            isInvalid={!!errors.Price}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Price}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="zip_code">
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            isInvalid={!!errors.zip_code}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip_code}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            isInvalid={!!errors.location}
          />
          <Form.Control.Feedback type="invalid">
            {errors.location}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="size">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            isInvalid={!!errors.size}
          />
          <Form.Control.Feedback type="invalid">
            {errors.size}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="hasOutdoorSpace">
          <Form.Check
            type="checkbox"
            name="hasOutdoorSpace"
            label="Has Outdoor Space"
            checked={formData.hasOutdoorSpace}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="cateringIncluded">
          <Form.Check
            type="checkbox"
            name="cateringIncluded"
            label="Catering Included"
            checked={formData.cateringIncluded}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        {selectedImage && (
          <img src={selectedImage} alt="Selected" height={200} width={200} />
        )}

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default Createspace;
