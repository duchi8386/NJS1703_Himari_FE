import { Row, Col, Card, Skeleton } from "antd";
import sampleProducts from "../../data/sampleProducts.js";
import ProductPage from "../../page/ProductPage";
import { useState, useEffect } from 'react';

// Component Skeleton
const ProductCardSkeleton = () => {
    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg">
          <Skeleton.Image 
            active 
            className="w-full h-[300px]"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Rating skeleton */}
            <div className="flex items-center mb-2">
              <Skeleton.Button 
                active 
                size="small" 
                style={{ width: 80, height: 20 }} 
              />
            </div>
            
            {/* Title and price skeleton */}
            <div className="flex justify-between items-end">
              <Skeleton.Button 
                active 
                size="small" 
                style={{ width: 200, height: 24 }} 
              />
              <Skeleton.Button 
                active 
                size="small" 
                style={{ width: 80, height: 24 }} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default function ProductsGrid({ viewMode, courses, onAddCartClick }) {
  // Generate array of 6 items for skeleton
  const skeletonArray = Array(6).fill(null);

  return (
    <Row gutter={[20, 20]} className="mt-8">
      {courses.length < 1
        ? // Render skeletons while loading
          skeletonArray.map((_, index) => (
            <Col
              xs={24}
              sm={viewMode === "list" ? 24 : 12}
              md={viewMode === "list" ? 24 : 12}
              lg={viewMode === "list" ? 24 : 12}
              xl={viewMode === "list" ? 24 : 8}
              key={`skeleton-${index}`}
            >
              <ProductCardSkeleton viewMode={viewMode} />
            </Col>
          ))
        : courses?.map((course, index) => (
            <Col
              xs={24}
              sm={viewMode === "list" ? 24 : 12}
              md={viewMode === "list" ? 24 : 12}
              lg={viewMode === "list" ? 24 : 12}
              xl={viewMode === "list" ? 24 : 8}
              key={course._id}
            >
              <ProductPage
                course={course}
                index={index}
                viewMode={viewMode}
                onAddCartClick={onAddCartClick}
              />
            </Col>
          ))}
    </Row>
  );
}
